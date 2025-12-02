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
};

export default config;