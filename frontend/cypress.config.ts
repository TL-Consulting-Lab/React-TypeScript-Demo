import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    video: false,
    screenshotOnRunFailure: true,
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeouts - generous for CI
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 60000,
    
    // Retry configuration
    retries: {
      runMode: 2,  // CI mode
      openMode: 0, // Local development
    },
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
  },
  
  // Component testing configuration (if needed in future)
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    specPattern: 'src/**/*.cy.tsx',
  },
});
