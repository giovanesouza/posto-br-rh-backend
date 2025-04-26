import jwt from 'jsonwebtoken';

export default async function (req, res, next) {
	const { authorization } = req.headers; // Extracts the authorization header from the request.
	if (!authorization)
		return res.status(401).json({ message: 'Acesso não autorizado. Cabeçalho de autorização ausente.'});

	const token = authorization.replace('Bearer ', '').trim(); 

	try {
		const {isAdmin} = jwt.verify(token, process.env.SECRET_JWT);
	
		if(!isAdmin) return res.status(403).json({ message: 'Acesso não autorizado.' });

		return next();
	} catch (error) {
		console.log(error.message)
		res.status(500).json({ error: 'Erro ao autenticar.' });
	}
};