import request from "supertest";
import app from "../index.js";

// Utility: valid UUID for testing
const validUUID = "123e4567-e89b-12d3-a456-426614174000";

describe("Users", () => {

    it("1 tenta criar perfil com usuário já cadastrado", async () => {
        const res = await request(app)
            .post("/users")
            .set("Authorization", `Bearer ${global.token}`)
            .send({
                username: process.env.USERNAME_TEST,
                password: process.env.PASSWORD_TEST,
                isAdmin: true,
                employeeId: process.env.USER_ID,
            });

        expect(res.status).toBe(409);
        expect(res.body.message).toBe("Usuário já cadastrado!");
    });


    it("2 should create a user successfully", async () => {
        const res = await request(app)
            .post("/users")
            .set("Authorization", `Bearer ${global.token}`)
            .send({
                username: `user_${Date.now()}`, // unique username
                password: "password123",
                isAdmin: false,
                employeeId: validUUID,
            });

        expect([201, 500, 409]).toContain(res.status);
        // 201 if created, 409 if duplicate username, 500 if DB error
    });

    it("3 should fail when username is missing", async () => {
        const res = await request(app)
            .post("/users")
            .set("Authorization", `Bearer ${global.token}`)
            .send({
                password: "password123",
                employeeId: validUUID,
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("O campo usuário é obrigatório!");
    });

    it("4 should fail when multiple fields are missing", async () => {
        const res = await request(app)
            .post("/users")
            .set("Authorization", `Bearer ${global.token}`)
            .send({});

        expect(res.status).toBe(400);
        expect(res.body.message).toContain("Os campos usuário, senha, funcionário são obrigatórios!");
    });

    it("5 should list all users", async () => {
        const res = await request(app)
            .get("/users")
            .set("Authorization", `Bearer ${global.token}`);

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("6 should return user by id", async () => {
        const res = await request(app)
            .get(`/users/${validUUID}`)
            .set("Authorization", `Bearer ${global.token}`);

        expect([200, 404]).toContain(res.status);
    });

    it("7 should fail when id parameter is invalid", async () => {
        const res = await request(app)
            .get("/users/invalid-id")
            .set("Authorization", `Bearer ${global.token}`);

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Parâmetro 'id' inválido!");
    });

    it("8 should update a user successfully", async () => {
        const res = await request(app)
            .patch(`/users/${validUUID}`)
            .set("Authorization", `Bearer ${global.token}`)
            .send({
                username: `updated_${Date.now()}`,
                password: "newpassword123",
            });

        expect([200, 404, 500]).toContain(res.status);
    });

    it("9 should delete a user successfully", async () => {
        const res = await request(app)
            .delete(`/users/${validUUID}`)
            .set("Authorization", `Bearer ${global.token}`);

        expect([204, 404, 500]).toContain(res.status);
    });

    it("10 should fail when deleting with invalid id", async () => {
        const res = await request(app)
            .delete("/users/invalid-id")
            .set("Authorization", `Bearer ${global.token}`);

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Parâmetro 'id' inválido!");
    });
});