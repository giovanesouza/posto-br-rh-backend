import { getAuthToken } from "./auth.mjs";

beforeAll(async () => {
  // Run before each test
  global.token = await getAuthToken();
});