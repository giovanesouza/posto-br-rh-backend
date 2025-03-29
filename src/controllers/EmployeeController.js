import { prismaClient } from '../database/prismaClient.js';

const findEmployeeByCPF = async (cpf) =>
    await prismaClient.employee.findFirst({ where: { cpf: cpf } });

const convertDateToISODateTime = (date) => new Date(date).toISOString();

export class EmployeeController {
    async createEmployee(req, res) {
        const { employeeId, name, cpf, admissionDate, isPendingVacation } = req.body;
        try {
            const employeeFound = await findEmployeeByCPF(cpf);
            if (employeeFound) return res.status(409).json({ message: 'Funcionário já cadastrado!' });

            const employee = await prismaClient.employee.create({
                data: {
                    employeeId,
                    name,
                    cpf,
                    admissionDate: convertDateToISODateTime(admissionDate),
                    isPendingVacation
                },
            });

            return res.status(201).json(employee);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar funcionário. Tente novamente!' });
        }
    };

    async findAllEmployees(req, res) {
        try {
            let employees = await prismaClient.employee.findMany({
                include: {
                    vacations: true,
                    user: true
                }
            });
            res.status(200).json(employees);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao listar funcionários.' });
        }
    };

    async findEmployeeById(req, res) {
        const { id } = req.params;
        try {
            const employee = await prismaClient.employee.findUnique({ where: { id } });

            if (employee !== null) return res.status(200).json(employee);

            res.status(404).json({ message: 'funcionário não localizado!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao buscar funcionário.' });
        }
    };

    async updateEmployee(req, res) {
        const { id } = req.params;
        const { employeeId, name, cpf, admissionDate, isPendingVacation } = req.body;
        try {
            const employeeFound = await prismaClient.employee.findUnique({ where: { id } });
            if (employeeFound == null) return res.status(404).json({ message: 'Funcionário não localizado!' });

            const employee = await prismaClient.employee.update({
                where: { id },
                data: {
                    employeeId,
                    name,
                    cpf,
                    admissionDate: convertDateToISODateTime(admissionDate),
                    isPendingVacation
                },
            });

            return res.status(200).json(employee);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar funcionário.' });
        }
    };

    async deleteEmployee(req, res) {
        const { id } = req.params;
        try {
            const employeeFound = await prismaClient.employee.findUnique({ where: { id } });

            if (employeeFound !== null) {
                await prismaClient.employee.delete({ where: { id }, });
                return res.status(204).send();
            };

            res.status(404).json({ message: 'Funcionário não localizado!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao excluir funcionário.' });
        }
    };
}