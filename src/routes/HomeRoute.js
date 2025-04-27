import { Router } from 'express';
const homeRoute = Router();

homeRoute.get('/', (req, res) => {
    res.status(200).json({
        message: 'Olá! Seja bem vindo(a) à Plataforma de RH do posto BR.',
    });
});

export { homeRoute };