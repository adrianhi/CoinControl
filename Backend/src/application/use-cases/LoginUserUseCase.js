import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { InvalidCredentialsError } from '../errors/InvalidCredentialsError.js';

export class LoginUserUseCase {
  constructor({ userRepository, jwtSecret }) {
    this.userRepository = userRepository;
    this.jwtSecret = jwtSecret;
  }

  async execute({ email, password }) {
    if (!email || !password) throw new InvalidCredentialsError();

    const user = await this.userRepository.findByEmail(email.trim().toLowerCase());
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      throw new InvalidCredentialsError();
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      this.jwtSecret,
      { expiresIn: '24h' }
    );

    return { token, user: user.toPublicJSON() };
  }
}
