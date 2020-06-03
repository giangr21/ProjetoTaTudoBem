import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';
import { getRepository } from 'typeorm';
import Usuario from '../models/Usuario';
import UsuarioService from './UsuarioService';

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  user: Usuario;
  token: string;
}

class AutenticarUsuarioService {
  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const usuarioService = new UsuarioService();
    const user = await usuarioService.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (senha !== user.senha) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AutenticarUsuarioService;
