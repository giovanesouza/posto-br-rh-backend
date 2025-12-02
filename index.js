import dotenv from "dotenv";
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: envFile, override: true });

import express from 'express';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json" assert { type: "json" };
import cors from 'cors';

import { homeRoute } from './src/routes/HomeRoute.js';
import { userRoutes } from './src/routes/UserRoutes.js';
import { employeeRoutes } from './src/routes/EmployeeRoutes.js';
import { vacationRoutes } from './src/routes/VacationRoutes.js';
import { positionRoutes } from './src/routes/PositionRoutes.js';
import { loginRoutes } from './src/routes/LoginRoutes.js';

const app = express();
app.use(express.json());

app.use(cors(
    {
        origin: [process.env.CORS_ORIGIN_URL],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
const PORT = process.env.PORT || 3000;

app.use(homeRoute);
app.use(userRoutes);
app.use(employeeRoutes);
app.use(vacationRoutes);
app.use(positionRoutes);
app.use(loginRoutes);

if (process.env.NODE_ENV !== "test") {
    app.listen(PORT, () => {
        console.log(`Servidor rodando em: http://localhost:${PORT}`);
    });
};

export default app; // It's used in prod