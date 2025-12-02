/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: true, // Enable code coverage collection
  coverageDirectory: "coverage",  // Directory where Jest should output coverage files

  testEnvironment: "node", // Use Node.js environment for testing (instead of jsdom)
  verbose: true,
  
  // Run this file after Jest environment is set up
  // Useful for global hooks like beforeAll (e.g., authentication)
  setupFilesAfterEnv: ["<rootDir>/tests/utils/globalSetup.mjs"],
  
  // No custom transformations (default behavior)
  transform: {},

  // coverageThreshold: {
  //   global: {
  //     branches: 50,   // Minimum global branch coverage (lower, since we enforce stricter rules below): if/else, switch
  //     functions: 50,  // Minimum global function coverage
  //     lines: 50,      // Minimum global line coverage
  //     statements: 50, // Minimum global statement coverage
  //   },
  //   "./src/controllers/": {
  //     branches: 80,   // Require at least 80% branch coverage in controllers
  //     functions: 80,  // Require at least 80% function coverage in controllers
  //     lines: 80,      // Require at least 80% line coverage in controllers
  //     statements: 80, // Require at least 80% statement coverage in controllers
  //   },
  //   "./src/routes/": {
  //     branches: 80,   // Require at least 80% branch coverage in routes
  //     functions: 80,  // Require at least 80% function coverage in routes
  //     lines: 80,      // Require at least 80% line coverage in routes
  //     statements: 80, // Require at least 80% statement coverage in routes
  //   },
  // },

};

export default config;