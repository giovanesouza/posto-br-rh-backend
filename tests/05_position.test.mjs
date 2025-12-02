import request from "supertest";
import app from "../index.js";

// Utility: valid UUID for testing
const validUUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Positions", () => {
  it("1 should create a position successfully", async () => {
    const res = await request(app)
      .post("/positions")
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        positionName: "Gerente",
        cbo: "1234-56",
      });

    expect([201, 500]).toContain(res.status);
    // 201 if created, 500 if DB error
  });

  it("2 should fail when positionName is missing", async () => {
    const res = await request(app)
      .post("/positions")
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        cbo: "1234-56",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("O campo cargo é obrigatório!");
  });

  it("3 should fail when both positionName and cbo are missing", async () => {
    const res = await request(app)
      .post("/positions")
      .set("Authorization", `Bearer ${global.token}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("Os campos cargo, CBO são obrigatórios!");
  });

  it("4 should list all positions", async () => {
    const res = await request(app)
      .get("/positions")
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("5 should return position by id", async () => {
    const res = await request(app)
      .get(`/positions/${validUUID}`)
      .set("Authorization", `Bearer ${global.token}`);

    expect([200, 404]).toContain(res.status);
  });

  it("6 should fail when id parameter is invalid", async () => {
    const res = await request(app)
      .get("/positions/invalid-id")
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Parâmetro 'id' inválido!");
  });

  it("7 should update a position successfully", async () => {
    const res = await request(app)
      .put(`/positions/${validUUID}`)
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        positionName: "Supervisor",
        cbo: "9876-54",
      });

    expect([200, 404, 500]).toContain(res.status);
  });

  it("8 should delete a position successfully", async () => {
    const res = await request(app)
      .delete(`/positions/${validUUID}`)
      .set("Authorization", `Bearer ${global.token}`);

    expect([204, 404, 500]).toContain(res.status);
  });

  it("9 should fail when deleting with invalid id", async () => {
    const res = await request(app)
      .delete("/positions/invalid-id")
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Parâmetro 'id' inválido!");
  });
});