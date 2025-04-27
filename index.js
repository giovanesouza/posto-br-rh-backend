import express from 'express';
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
        origin: [process.env.CORS_ORIGIN_URL, "http://127.0.0.1:5500", "http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
));

const PORT = process.env.PORT || 3000;

app.use(homeRoute);
app.use(userRoutes);
app.use(employeeRoutes);
app.use(vacationRoutes);
app.use(positionRoutes);
app.use(loginRoutes);

// This line is only used for local tests
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

export default app; // It's used in prod