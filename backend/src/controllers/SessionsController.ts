import { Request, Response } from 'express';
import AutenticarUsuarioService from '../services/AutenticarUsuarioService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, senha } = request.body;
    const autenticarUsuarioService = new AutenticarUsuarioService();
    const { user, token } = await autenticarUsuarioService.execute({
      email,
      senha,
    });
    return response.json({ user, token });
  }
}
