import { prismaClient } from '../database/prismaClient.js';
import bcrypt from 'bcryptjs';

const findUserByUsername = async (username) =>
	await prismaClient.user.findUnique({ where: { username: username } });

const findEmployeeById = async (id) =>
	await prismaClient.user.findUnique({ where: { employeeId: id } });

export class UserController {
	async createUser(req, res) {
		const { username, password, isAdmin, employeeId } = req.body;
		try {
			const userFound = await findUserByUsername(username);
			if (userFound) return res.status(409).json({ message: 'Usuário já cadastrado!' });

			const existingUser = await findEmployeeById(employeeId)
			if (existingUser) throw new Error("Este funcionário já está vinculado a outro usuário.");

			const hashPass = bcrypt.hashSync(password, 10);

			const user = await prismaClient.user.create({
				data: { username, password: hashPass, isAdmin, employeeId },
			});

			return res.status(201).json(user);
		} catch (error) {
			console.log(error)
			return res.status(500).json({ message: 'Erro ao cadastrar usuário. Tente novamente!' });
		}
	};

	async findAllUsers(req, res) {
		try {
			let users = await prismaClient.user.findMany();

			res.status(200).json(users);
		} catch (error) {
			return res.status(500).json({ message: 'Erro ao listar usuários.' });
		}
	};

	async findUserById(req, res) {
		const { id } = req.params;
		try {
			const user = await prismaClient.user.findUnique({ where: { id }, include: { employee: true } });

			if (user !== null) return res.status(200).json(user);

			res.status(404).json({ message: 'Usuário não localizado!' });
		} catch (error) {
			return res.status(500).json({ message: 'Erro ao buscar usuário.' });
		}
	};

	async updateUser(req, res) {
		const { id } = req.params;
		const { username, password } = req.body;
		try {
			const userFound = await prismaClient.user.findUnique({ where: {id} });

			const hashPass = password ? bcrypt.hashSync(password, 10) : userFound.password;

			const user = await prismaClient.user.update({
				where: { id },
				data: { username, password: hashPass }
			});

			return res.status(200).json(user);
		} catch (error) {
			return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
		}
	};

	async deleteUser(req, res) {
		const { id } = req.params;
		try {
			const userFound = await prismaClient.user.findUnique({ where: { id } });

			if (userFound !== null) {
				await prismaClient.user.delete({ where: { id }, });
				return res.status(204).send();
			};

			res.status(404).json({ message: 'Usuário não localizado!' });
		} catch (error) {
			return res.status(500).json({ message: 'Erro ao excluir usuário.' });
		}
	};
}