import request from "supertest";
import app from "../index.js";

describe("Login API", () => {
  it("1 should return 400 when username or password is missing", async () => {
    const res = await request(app).post("/sign-in").send({
      username: "",
      password: ""
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/obrigatório/);
  });

  it("2 should return 200 when username and password are correct", async () => {
    const res = await request(app).post("/sign-in").send({
      username: process.env.USER_TEST,
      password: process.env.PASSWORD_TEST
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("userId");
  });

  it("3 should return 404 when user does not exist", async () => {
    const res = await request(app).post("/sign-in").send({
      username: "usuario_inexistente",
      password: "senhaqualquer"
    });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Usuário não encontrado.");
  });

  it("4 should return 404 when password is incorrect", async () => {
    const res = await request(app).post("/sign-in").send({
      username: process.env.USER_TEST,
      password: "senha_errada"
    });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Senha incorreta.");
  });

  it("5 should return 400 when only username is provided", async () => {
    const res = await request(app).post("/sign-in").send({
      username: process.env.USER_TEST,
      password: ""
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/senha/);
  });

  it("6 should return 400 when only password is provided", async () => {
    const res = await request(app).post("/sign-in").send({
      username: "",
      password: process.env.PASSWORD_TEST
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/usuário/);
  });

  it("7 should return 500 when an unexpected error occurs", async () => {
    const res = await request(app).post("/sign-in").send({
      username: null,
      password: null
    });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Os campos usuário, senha são obrigatórios!");
  });
});