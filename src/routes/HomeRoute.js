import { Router } from 'express';
const homeRoute = Router();

homeRoute.get('/', (req, res) => {
    res.status(200).json({
        message: 'Olá! Seja bem vindo(a) ao Sistema de Controle de Férias de Funcionários do posto BR.',
    });
});

export { homeRoute };