/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
  collectCoverage: false,
  testEnvironment: "node",
  setupFilesAfterEnv: ["<rootDir>/tests/utils/globalSetup.mjs"],
  transform: {},
};

export default config;