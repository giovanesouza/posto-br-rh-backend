import { prismaClient } from '../database/prismaClient.js';

export class PositionController {
    async createPosition(req, res) {
        const { positionName, cbo } = req.body;
        try {
            const position = await prismaClient.position.create({
                data: { positionName, cbo },
            });

            return res.status(201).json(position);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar cargo. Tente novamente!' });
        }
    };

    async findAllPositions(req, res) {
        try {
            let positions = await prismaClient.position.findMany({
                include: {
                    employees: true,
                }
            });
            res.status(200).json(positions);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar cargos.' });
        }
    };

    async findPositionById(req, res) {
        const { id } = req.params;
        try {
            const position = await prismaClient.position.findUnique({
                where: { id }, 
                include: {
                    employees: true,
                }
            });

            if (position !== null) return res.status(200).json(position);

            res.status(404).json({ message: 'Cargo não localizado!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar cargo.' });
        }
    };

    async updatePosition(req, res) {
        const { id } = req.params;
        const { positionName, cbo } = req.body;
        try {
            const positionFound = await prismaClient.position.findUnique({ where: { id } });
            if (positionFound == null) return res.status(404).json({ message: 'Cargo não localizado!' });

            const position = await prismaClient.position.update({
                where: { id },
                data: { positionName, cbo },
            });

            return res.status(200).json(position);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar cargo.' });
        }
    };

    async deleteposition(req, res) {
        const { id } = req.params;
        try {
            const positionFound = await prismaClient.position.findUnique({ where: { id } });

            if (positionFound !== null) {
                await prismaClient.position.delete({ where: { id }, });
                return res.status(204).send();
            };

            res.status(404).json({ message: 'Cargo não localizado!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao excluir cargo.' });
        }
    };
}