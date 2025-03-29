import { prismaClient } from '../database/prismaClient.js';

const findEmployeeByCPF = async (cpf) =>
    await prismaClient.vacation.findFirst({ where: { cpf: cpf } });

const convertDateToISODateTime = (date) => new Date(date).toISOString();

export class VacationController {
    async createVacation(req, res) {
        const { employeeId, isVacationSold, soldDays, startDate, endDate } = req.body;
        try {
            const employeeFound = await prismaClient.user.findUnique({ where: { id: employeeId } })
            if (!employeeFound) return res.status(404).json({ message: 'Funcionário não localizado!' });

            const vacation = await prismaClient.vacation.create({
                data: {
                    employeeId,
                    isVacationSold,
                    soldDays,
                    startDate: convertDateToISODateTime(startDate),
                    endDate: convertDateToISODateTime(endDate)
                },
            });

            return res.status(201).json(vacation);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar férias. Tente novamente!' });
        }
    };

    async findAllVacation(req, res) {
        try {
            // Making a filter to get by year, employee....
            let vacations = await prismaClient.vacation.findMany({
                include: {
                    employee: true
                },
            });
            res.status(200).json(vacations);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar fériass.' });
        }
    };

    async findVacationById(req, res) {
        const { id } = req.params;
        try {
            const vacation = await prismaClient.vacation.findUnique({
                where: { id },
                include: {
                    employee: true
                },
            });

            if (vacation !== null) return res.status(200).json(vacation);

            res.status(404).json({ message: 'Férias não localizadas!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar férias.' });
        }
    };

    async updateVacation(req, res) {
        const { id } = req.params;
        const { employeeId, isVacationSold, soldDays, startDate, endDate } = req.body;
        try {
            const vacationFound = await prismaClient.vacation.findUnique({ where: { id } });
            if (vacationFound == null) return res.status(404).json({ message: 'Férias não localizadas!' });

            const vacation = await prismaClient.vacation.update({
                where: { id },
                data: {
                    employeeId,
                    isVacationSold,
                    soldDays,
                    startDate: convertDateToISODateTime(startDate),
                    endDate: convertDateToISODateTime(endDate)
                },
            });

            return res.status(200).json(vacation);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar férias.' });
        }
    };

    async deleteVacation(req, res) {
        const { id } = req.params;
        try {
            const vacationFound = await prismaClient.vacation.findUnique({ where: { id } });

            if (vacationFound !== null) {
                await prismaClient.vacation.delete({ where: { id }, });
                return res.status(204).send();
            };

            res.status(404).json({ message: 'Férias não localizadas!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao excluir férias.' });
        }
    };
}