import jwt from 'jsonwebtoken';

export function authenticateJwt(jwtSecret) {
  return (request, response, next) => {
    const authorization = request.headers.authorization;
    const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;
    if (!token) return response.status(401).json({ message: 'Token de autenticación requerido' });

    try {
      request.auth = jwt.verify(token, jwtSecret);
      return next();
    } catch (_error) {
      return response.status(401).json({ message: 'Token de autenticación inválido o expirado' });
    }
  };
}
