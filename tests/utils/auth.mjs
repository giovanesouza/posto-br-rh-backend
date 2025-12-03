import request from "supertest";
import app from "../../index.js"; // Run App

export async function getAuthToken() {
  const res = await request(app).post("/sign-in").send({
    username: process.env.USERNAME_TEST,
    password: process.env.PASSWORD_TEST,
  });
  return res.body.token;
};