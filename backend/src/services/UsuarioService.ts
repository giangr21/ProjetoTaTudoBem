import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import IPessoaRepository from '../factory/IPessoaFactory';
import Usuario from '../models/Usuario';
import VoluntarioService from './VoluntarioService';

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

class UsuarioService implements IPessoaRepository {
  public async findById(id: string): Promise<Usuario | undefined> {
    const usuariosRepository = getRepository(Usuario);
    const usuario = await usuariosRepository.findOne({ id });
    return usuario;
  }

  public async findByEmail(email: string): Promise<Usuario | undefined> {
    const usuariosRepository = getRepository(Usuario);
    const user = await usuariosRepository.findOne({
      where: { email },
    });
    return user;
  }

  public async create(userData: IRequest): Promise<Usuario | undefined> {
    const usuariosRepository = getRepository(Usuario);
    const voluntarioService = new VoluntarioService();

    const user = await this.findByEmail(userData.email);
    const voluntario = await voluntarioService.findByEmail(userData.email);

    if (user) {
      throw new AppError('Email already in use (user)');
    }

    if (voluntario) {
      throw new AppError('Email already in use (voluntario)');
    }

    const u = await usuariosRepository.create(userData);
    await usuariosRepository.save(u);
    return u;
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
    const user = await usuariosRepository.findOne({ id });
    if (!user) {
      throw new AppError('User ID does not exist', 404);
    }
    await usuariosRepository.delete({ id });
  }
}

export default UsuarioService;
