import jwt from 'jsonwebtoken';

export default function authorize(allowedProfiles = []) {
    return async (req, res, next) => {

        const { authorization } = req.headers; // Extracts the authorization header from the request.
        if (!authorization) return res.status(401).json({ message: 'Acesso não autorizado. Cabeçalho de autorização ausente.'});

        const token = authorization.replace('Bearer ', '').trim();

        try {
            const payload = jwt.verify(token, process.env.SECRET_JWT);
            const { isAdmin, profile } = payload;

            // Normalize profile to an array for easier checks
            const profiles = Array.isArray(profile) ? profile : (profile ? [profile] : []);

            // If no profiles were provided, require isAdmin (legacy behavior)
            if (allowedProfiles.length === 0) {
                if (!isAdmin) return res.status(403).json({ message: 'Acesso não autorizado.' });
                return next();
            }

            // If allowed profiles are provided, allow access if isAdmin OR if the profile is in the allowed list
            const hasAllowedProfile = profiles.some(p => allowedProfiles.includes(p));
            if (!isAdmin && !hasAllowedProfile) {
                return res.status(403).json({ message: 'Acesso não autorizado para este perfil.' });
            }

            return next();
        } catch (error) {
            return res.status(401).json({ error: 'Token inválido ou expirado.' });
        }
    };
}