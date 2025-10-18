# CI Health Check Fix

## Problem
The Playwright tests were consistently failing in the CI environment with health check timeouts, even though they worked perfectly in local development.

## Root Cause
The health check failures were caused by two main issues:

1. **No explicit timeouts on curl commands**: The curl commands used to check if services were ready had no timeout parameters. If the service wasn't responding, curl would use its default timeout (which can be very long), causing the entire CI job to timeout.

2. **Error output suppression**: The wait loops used `2>/dev/null` to suppress error messages from curl. This made it impossible to diagnose why the health checks were failing, as all error information was being discarded.

3. **Limited debugging information**: When health checks failed, there was minimal diagnostic information to understand what went wrong.

## Solution
Added explicit timeouts and better error reporting to all health check curl commands throughout the workflow:

### Changes Applied

#### 1. Added Explicit Curl Timeouts
Changed from:
```bash
curl -f http://localhost:5000/api/tasks 2>/dev/null
```

To:
```bash
curl -f --connect-timeout 5 --max-time 10 http://localhost:5000/api/tasks
```

**Benefits:**
- `--connect-timeout 5`: Fail fast if connection can't be established within 5 seconds
- `--max-time 10`: Total operation must complete within 10 seconds
- Removes `2>/dev/null` so errors are visible in CI logs

#### 2. Enhanced Error Diagnostics
When health checks fail, the workflow now shows:
```bash
echo "=== Backend logs ==="
cat backend/backend.log || true
echo "=== Checking if backend process is running ==="
ps aux | grep -i "node\|ts-node" || true
```

This helps identify whether:
- The process failed to start
- The process started but crashed
- The process is running but not responding

#### 3. Locations Updated
Applied timeout fixes to all curl commands in:
- Wait for backend step (line 71)
- Wait for frontend step (line 107)
- Verify services are healthy step (lines 140, 144, 149, 166, 178)
- Pre-test network verification (lines 224, 228)
- Backend E2E pre-check (line 247)

## Why This Works

### The Timeout Problem
Without explicit timeouts, curl uses system defaults which can be 2+ minutes. In CI:
1. Service might be slow to start or not responding
2. Curl waits with default timeout (120+ seconds)
3. The for loop has 40 iterations × 3 seconds = 120 seconds max
4. But curl alone could consume all that time on first attempt
5. Result: Timeout without useful diagnostics

### With Timeouts
1. Curl attempts connection with 5-second connect timeout
2. If connected, operation must complete within 10 seconds total
3. If it fails, we see the error message and retry in 3 seconds
4. Much more predictable and debuggable behavior

### Error Visibility
Previously `2>/dev/null` hid crucial information like:
- "Connection refused" (service not started)
- "Connection timeout" (network issue)
- "HTTP 500" (service error)

Now these errors are visible in CI logs, making debugging trivial.

## Testing

Tested locally:
```bash
# Start backend
cd backend && HOST=0.0.0.0 NODE_ENV=test npm run dev > backend.log 2>&1 &

# Test health check with new timeout
curl -f --connect-timeout 5 --max-time 10 http://localhost:5000/api/tasks
# Result: Returns immediately when ready, or fails fast if not ready
```

## Expected Outcome
The CI workflow should now:
1. ✅ Fail fast if services don't start (within 5-10 seconds per attempt)
2. ✅ Show clear error messages when health checks fail
3. ✅ Complete health checks faster when services are ready
4. ✅ Provide diagnostic information (logs, process status) on failure
5. ✅ Pass consistently in CI environment

## Related Files
- `.github/workflows/playwright.yml` - Main workflow file with all health check logic

## Rollback Plan
If this causes issues, revert commit 801526e to restore previous behavior. However, this would also restore the timeout and debugging problems.

## Additional Notes
- The timeout values (5s connect, 10s total) are conservative and should work even in slow CI environments
- If CI is extremely slow, these can be increased, but current values should be sufficient
- The process checking (`ps aux`) helps identify if processes are starting but crashing
