import request from "supertest";
import app from "../index.js";
import jwt from "jsonwebtoken";

describe("Authorization Middleware", () => {
  it("should return 401 when no token is provided", async () => {
    const res = await request(app).get("/employees");
    expect(res.status).toBe(401);
    expect(res.body.message).toContain("Acesso não autorizado");
  });

  it("should return 401 for malformed token", async () => {
    const res = await request(app)
      .get("/employees")
      .set("Authorization", "Bearer token_invalido");

    expect(res.status).toBe(401);
  });

  it("should return 401 for invalid signature", async () => {
    const fakeJwt = jwt.sign(
      { userId: "123" },
      "WRONG_SECRET"
    );

    const res = await request(app)
      .get("/employees")
      .set("Authorization", `Bearer ${fakeJwt}`);

    expect(res.status).toBe(401);
  });
});
