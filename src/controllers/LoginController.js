import { prismaClient } from '../database/prismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class LoginController {
    async sign(req, res) {
        const { username, password } = req.body;

        try {
            const user = await prismaClient.user.findUnique({ where: { username } });

            if (!user) return res.status(404).json({ message: 'Usuário não encontrado.' });

            const verifyPassword = bcrypt.compareSync(password, user.password);

            if (!verifyPassword) return res.status(404).json({ message: 'Senha incorreta.' });

            const userData = {
                userId: user.id,
                profile: user.profile,
                employeeId: user.employeeId,
                isAdmin: user.isAdmin
            };

            const token = jwt.sign(userData, process.env.SECRET_JWT, { expiresIn: '1h' });
            userData.token = token;
            
            return res.status(200).json(userData);
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao realizar login.' });
        }
    }
}