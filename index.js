import express from 'express';
import cors from 'cors';

import { userRoutes } from './src/routes/UserRoutes.js';
import { employeeRoutes } from './src/routes/EmployeeRoutes.js';
import { vacationRoutes } from './src/routes/VacationRoutes.js';
import { positionRoutes } from './src/routes/PositionRoutes.js';
import { loginRoutes } from './src/routes/LoginRoutes.js';

const app = express();
app.use(express.json());

app.use(cors(
    {
        // origin: process.env.CORS_ORIGIN_URL,
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
));

const PORT = process.env.PORT || 3000;
const STR_API = '/api/';

app.get(STR_API, (req, res) => {
    res.status(200).json({
        message: 'Olá! Seja bem vindo(a) à Plataforma de RH do posto BR.',
    });
});

app.use(STR_API , userRoutes);
app.use(STR_API , employeeRoutes);
app.use(STR_API, vacationRoutes);
app.use(STR_API, positionRoutes);
app.use(STR_API, loginRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});