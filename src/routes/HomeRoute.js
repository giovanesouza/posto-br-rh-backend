import { Router } from 'express';
const homeRoute = Router();

homeRoute.get('/', (req, res) => {
    res.status(200).json({
        "Home": 'Olá! Seja bem vindo(a) ao Sistema de Controle de Férias de Funcionários do posto BR.',
        "Documentation": "/api-docs"
    });
});

export { homeRoute };