import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';
import Usuario from '../models/Usuario';
import UsuarioService from './UsuarioService';
import VoluntarioService from './VoluntarioService';

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
    const voluntarioService = new VoluntarioService();
    const user = await usuarioService.findByEmail(email);
    const voluntario = await voluntarioService.findByEmail(email);

    if (!user && !voluntario) {
      throw new AppError('Incorrect email/password combination.', 401);
    } else if (user) {
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
    } else if (!voluntario) {
      throw new AppError('Incorrect email/password combination.', 401);
    } else {
      if (senha !== voluntario.senha) {
        throw new AppError('Incorrect email/password combination.', 401);
      }

      const { secret, expiresIn } = authConfig.jwt;
      const token = sign({}, secret, {
        subject: voluntario.id,
        expiresIn,
      });

      return {
        user: voluntario,
        token,
      };
    }
  }
}

export default AutenticarUsuarioService;
