import { prismaClient } from '../database/prismaClient.js';
import bcrypt from 'bcryptjs';

const findUserByEmail = async (email) =>
	await prismaClient.user.findFirst({ where: { email: email } });

export class UserController {
	async createUser(req, res) {
		const { email, password, isAdmin } = req.body;
		try {
			const userFound = await findUserByEmail(email);
			if (userFound) return res.status(409).json({ message: 'E-mail já cadastrado!' });

			const hashPass = bcrypt.hashSync(password, 10);

			const user = await prismaClient.user.create({
				data: { email, password: hashPass, isAdmin },
			});

			return res.status(201).json(user);
		} catch (error) {
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
			const user = await prismaClient.user.findUnique({ where: { id } });

			if (user !== null) return res.status(200).json(user);

			res.status(404).json({ message: 'Usuário não localizado!' });
		} catch (error) {
			return res.status(500).json({ message: 'Erro ao buscar usuário.' });
		}
	};

	async updateUser(req, res) {
		const { id } = req.params;
		const { email, password } = req.body;
		try {
			const userFound = await findUserByEmail(email);

			if (userFound !== null) {
				return res.status(409).json({ message: 'O e-mail informado não pode ser utilizado.' });
			}

			const hashPass = bcrypt.hashSync(password, 10);
			const user = await prismaClient.user.update({
				where: { id },
				data: { email, password: hashPass },
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