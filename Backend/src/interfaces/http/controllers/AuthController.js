import { InvalidCredentialsError } from '../../../application/errors/InvalidCredentialsError.js';

export class AuthController {
  constructor(loginUserUseCase) {
    this.loginUserUseCase = loginUserUseCase;
  }

  login = async (request, response) => {
    try {
      const { email, password } = request.body ?? {};
      const result = await this.loginUserUseCase.execute({ email, password });
      return response.status(200).json(result);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return response.status(401).json({ message: error.message });
      }

      console.error('Login failed:', error);
      return response.status(500).json({ message: 'No se pudo iniciar sesión' });
    }
  };
}
