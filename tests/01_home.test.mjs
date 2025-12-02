import request from "supertest";
import app from "../index.js";

describe("Home API", () => {
  it("1 should return welcome message and documentation link", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      Home: "Olá! Seja bem vindo(a) ao Sistema de Controle de Férias de Funcionários do posto BR.",
      Documentation: "/api-docs",
    });
  });
});