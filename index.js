import express from 'express';
import cors from 'cors';

import { userRoutes } from './src/routes/UserRoutes.js';
import { employeeRoutes } from './src/routes/EmployeeRoutes.js';
import { vacationRoutes } from './src/routes/VacationRoutes.js';


const app = express();
app.use(express.json());

app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
    }
));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Olá! Seja bem vindo(a) à Plataforma de RH do posto BR.',
    });
});

app.use(userRoutes);
app.use(employeeRoutes);
app.use(vacationRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});