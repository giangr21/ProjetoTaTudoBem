import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import IPessoaRepository from '../factory/IPessoaFactory';
import Usuario from '../models/Usuario';

interface IRequest {
  nome: string;
  email: string;
  senha: string;
}

interface IUpdateUser {
  id: string;
  nome: string;
  email: string;
  senha: string;
}

class UsuarioService implements IPessoaRepository{

  public async findById(id: string): Promise<Usuario | undefined>{
    const usuariosRepository = getRepository(Usuario);
    const usuarios = await usuariosRepository.findOne({id});
    return usuarios;
  }

  public async findByEmail(email: string): Promise<Usuario | undefined>{
    const usuariosRepository = getRepository(Usuario);
    const user = await usuariosRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async create(userData: IRequest): Promise<Usuario | undefined> {
    const usuariosRepository = getRepository(Usuario);
    const user = await usuariosRepository.create(userData)
    await usuariosRepository.save(user);
    return user;
  }

  public async update(userData: IUpdateUser): Promise<Usuario | undefined> {
    const usuariosRepository = getRepository(Usuario);
    const user = await usuariosRepository.findOne(userData.id);
    if (!user) {
      throw new AppError('User ID does not exist', 404);
    }
    user.email = userData.email;
    user.nome = userData.nome;
    user.senha = userData.senha;
    return usuariosRepository.save(user);
  }

  public async delete(id: string): Promise<void> {
    const usuariosRepository = getRepository(Usuario);
    const user = await usuariosRepository.findOne({id});
    if (!user) {
      throw new AppError('User ID does not exist', 404);
    }
    await usuariosRepository.delete({ id });
  }
}

export default UsuarioService;
