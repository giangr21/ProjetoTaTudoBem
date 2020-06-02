import { Request, Response } from 'express';
import UsuarioService from '../services/UsuarioService';

export default class UsuarioController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, email, senha } = request.body;

    const usuarioService = new UsuarioService();

    const user = await usuarioService.create({
      nome,
      email,
      senha,
    });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id,nome, email, senha } = request.body;

    const usuarioService = new UsuarioService();

    const user = await usuarioService.update({
      id,
      nome,
      email,
      senha,
    });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const usuarioService = new UsuarioService();

    await usuarioService.delete(id);

    return response.status(204).send();
  }


}
