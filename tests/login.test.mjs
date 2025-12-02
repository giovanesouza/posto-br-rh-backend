import request from "supertest";
import app from "../index.js";

describe("Login API", () => {
  it("should return 400 when username or password is missing", async () => {
    const res = await request(app).post("/sign-in").send({
      username: "",
      password: ""
    });

    expect(res.status).toBe(400);
  });

    it("should return 204 when username or password is present", async () => {
    const res = await request(app).post("/sign-in").send({
      username: process.env.USER_TEST,
      password: process.env.PASSWORD_TEST
    });
    expect(res.status).toBe(200);
  });
});
