import request from "supertest";
import app from "../index.js";

let createdEmployeeId;

describe("Employees API", () => {
  it("1 should return 400 when required fields are missing", async () => {
    const res = await request(app)
      .post("/employees")
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        name: "",
        cpf: "",
        admissionDate: "",
        isPendingVacation: undefined,
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/obrigatórios/);
  });

  it("2 should create a new employee successfully", async () => {
    const res = await request(app)
      .post("/employees")
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        name: "João Teste",
        cpf: "12345678900",
        admissionDate: "2023-01-01",
        isPendingVacation: false,
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
    createdEmployeeId = res.body.id;
  });

  it("3 should not allow creating employee with duplicate CPF", async () => {
    const res = await request(app)
      .post("/employees")
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        name: "João Teste 2",
        cpf: "12345678900", // mesmo CPF
        admissionDate: "2023-01-01",
        isPendingVacation: false,
      });

    expect(res.status).toBe(409);
    expect(res.body.message).toBe("Funcionário já cadastrado!");
  });

  it("4 should list all employees", async () => {
    const res = await request(app)
      .get("/employees")
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("5 should find employee by id", async () => {
    const res = await request(app)
      .get(`/employees/${createdEmployeeId}`)
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id", createdEmployeeId);
  });

  it("6 should return 404 when employee not found by id", async () => {
    const res = await request(app)
      .get(`/employees/00000000-0000-0000-0000-000000000000`)
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Funcionário não localizado!");
  });

  it("7 should update employee successfully", async () => {
    const res = await request(app)
      .patch(`/employees/${createdEmployeeId}`)
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        name: "João Atualizado",
        cpf: "12345678900",
        admissionDate: "2023-01-01",
        isPendingVacation: true,
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("João Atualizado");
  });

  it("8 should delete employee successfully", async () => {
    const res = await request(app)
      .delete(`/employees/${createdEmployeeId}`)
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(204);
  });

  it("9 should return 404 when deleting non-existent employee", async () => {
    const res = await request(app)
      .delete(`/employees/${createdEmployeeId}`)
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Funcionário não localizado!");
  });
});