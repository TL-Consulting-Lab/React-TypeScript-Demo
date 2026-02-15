# Playwright Test Backup

This directory contains a backup of the Playwright E2E tests that were replaced with Cypress.

## Contents

- `frontend/` - Frontend Playwright tests and configuration
  - `e2e/` - Test files
    - `app.spec.ts` - Main application tests
    - `integration.spec.ts` - Integration tests
    - `page-object-tests.spec.ts` - Page object pattern tests
    - `helpers/page-objects.ts` - Page object models
  - `playwright.config.ts` - Playwright configuration

- `backend/` - Backend Playwright tests (if any existed)

## Why This Backup Exists

The Playwright tests were experiencing consistent failures in CI environments despite working locally. After multiple attempts to fix configuration, timeouts, and server management, the decision was made to try Cypress as an alternative E2E testing framework to determine if the issue was framework-specific.

## Restoration

If you need to restore Playwright tests:

1. Copy files from `.playwright-backup/frontend/` back to `frontend/`
2. Install Playwright dependencies:
   ```bash
   cd frontend
   npm install --save-dev @playwright/test@^1.54.1
   npx playwright install --with-deps
   ```
3. Update `package.json` scripts for Playwright
4. Remove Cypress configuration and tests

## Date Backed Up

December 2025

## Related Issues

- Original issue: Fix front end playwright tests (#21)
- PR: Fix Playwright test failures in CI with improved test reliability and automated server management
