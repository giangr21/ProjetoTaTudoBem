import { Request, Response } from 'express';
import VoluntarioService from '../services/VoluntarioService';

export default class VoluntarioController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, email, senha, profissao, isAdmin = true } = request.body;

    const voluntarioService = new VoluntarioService();

    const voluntario = await voluntarioService.create({
      nome,
      email,
      profissao,
      isAdmin,
      senha,
    });

    return response.json(voluntario);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, nome, email, senha, profissao, isAdmin } = request.body;

    const voluntarioService = new VoluntarioService();

    const voluntario = await voluntarioService.update({
      id,
      nome,
      email,
      senha,
      isAdmin,
      profissao,
    });

    return response.json(voluntario);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const voluntarioService = new VoluntarioService();

    await voluntarioService.delete(id);

    return response.status(204).send();
  }
}
