import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';
import IPessoaRepository from '../factory/IPessoaFactory';
import Usuario from '../models/Usuario';

class UsuarioService implements IPessoaRepository{

  constructor() {

  }

  public async findById(id: string): Promise<Usuario | undefined>{
    const usuariosRepository = getRepository(Usuario);
    const usuarios = await usuariosRepository.find();
    return usuarios;
    // TO DO
  }
  public async create(data: any): Promise<Usuario | undefined> {
    // TO DO
  }
  public async update(data: any): Promise<Usuario | undefined> {
    // TO DO

  }
  public async delete(id: string): boolean {
    return true;
    // TO DO
  }
}

export default UsuarioService;
