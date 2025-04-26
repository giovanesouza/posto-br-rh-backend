import { prismaClient } from '../database/prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginController {
    async sign(req, res) {
        const { email, password } = req.body;

        try {
            const user = await prismaClient.user.findUnique({
                where: { email },
                include: { employee: true }
            });

            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

            const verifyPassword = bcrypt.compareSync(password, user.password);

            if (!verifyPassword) return res.status(404).json({ message: 'Senha incorreta.' });

            const token = jwt.sign(
                {
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                process.env.SECRET_JWT, { expiresIn: '1h' },
            );

            return res.status(200).json({ id: user.id, isAdmin: user.isAdmin, token: token });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao realizar login.' });
        }
    }
}