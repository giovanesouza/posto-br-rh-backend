import request from "supertest";
import app from "../index.js";

// Utility to generate a valid UUID for testing
const validUUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Vacations", () => {
  it("1 should create a vacation successfully", async () => {
    const res = await request(app)
      .post("/vacation")
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        employeeId: validUUID,
        isVacationSold: false,
        soldDays: null,
        startDate: "2025-01-01",
        endDate: "2025-01-15",
      });

    expect([201, 404]).toContain(res.status); 
    // 201 if employee exists, 404 if not found
  });

  it("2 should fail when employeeId is invalid", async () => {
    const res = await request(app)
      .post("/vacation")
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        employeeId: "invalid-id",
        isVacationSold: false,
        soldDays: null,
        startDate: "2025-01-01",
        endDate: "2025-01-15",
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("ID do funcionário inválido!");
  });

  it("3 should list all vacations", async () => {
    const res = await request(app)
      .get("/vacation")
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("4 should return vacation by id", async () => {
    const res = await request(app)
      .get(`/vacation/${validUUID}`)
      .set("Authorization", `Bearer ${global.token}`);

    expect([200, 404]).toContain(res.status);
  });

  it("should fail when id parameter is invalid", async () => {
    const res = await request(app)
      .get("/vacation/invalid-id")
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Parâmetro 'id' inválido!");
  });

  it("5 should update a vacation successfully", async () => {
    const res = await request(app)
      .patch(`/vacation/${validUUID}`)
      .set("Authorization", `Bearer ${global.token}`)
      .send({
        employeeId: validUUID,
        isVacationSold: true,
        soldDays: 5,
        startDate: "2025-02-01",
        endDate: "2025-02-10",
      });

    expect([200, 404]).toContain(res.status);
  });

  it("6 should delete a vacation successfully", async () => {
    const res = await request(app)
      .delete(`/vacation/${validUUID}`)
      .set("Authorization", `Bearer ${global.token}`);

    expect([204, 404]).toContain(res.status);
  });

  it("7 should fail when deleting with invalid id", async () => {
    const res = await request(app)
      .delete("/vacation/invalid-id")
      .set("Authorization", `Bearer ${global.token}`);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Parâmetro 'id' inválido!");
  });
});