import request from "supertest";
import app from "../../index.js"; // Run App

export async function getAuthToken() {
  const res = await request(app).post("/sign-in").send({
    username: process.env.USER_TEST,
    password: process.env.PASSWORD_TEST,
  });
  return res.body.token;
}