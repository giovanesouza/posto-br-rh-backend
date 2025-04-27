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

app.use(cors());

const PORT = process.env.PORT || 3000;
const STR_API = '/api/';

app.use(homeRoute);
app.use(STR_API , userRoutes);
app.use(STR_API , employeeRoutes);
app.use(STR_API, vacationRoutes);
app.use(STR_API, positionRoutes);
app.use(STR_API, loginRoutes);

// This line is only used for local tests
app.listen(PORT, () => {
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
});

export default app; // It's used in prod