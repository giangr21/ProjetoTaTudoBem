import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import IPessoaRepository from '../factory/IPessoaFactory';
import Voluntario from '../models/Voluntario';

interface IRequest {
  nome: string;
  email: string;
  profissao: string;
  isAdmin: boolean;
  senha: string;
}
interface IUpdateVoluntario {
  id: string;
  nome: string;
  email: string;
  profissao: string;
  isAdmin: boolean;
  senha: string;
}

class VoluntarioService implements IPessoaRepository{

  public async findById(id: string): Promise<Voluntario | undefined>{
    const voluntarioRepository = getRepository(Voluntario);
    const voluntario = await voluntarioRepository.findOne({id});
    return voluntario;
  }

  public async findByEmail(email: string): Promise<Voluntario | undefined>{
    const voluntarioRepository = getRepository(Voluntario);
    const voluntario = await voluntarioRepository.findOne({
      where: { email },
    });
    return voluntario;
  }

  public async create(voluntarioData: IRequest): Promise<Voluntario | undefined> {
    const voluntarioRepository = getRepository(Voluntario);
    const voluntario = await voluntarioRepository.create(voluntarioData)
    await voluntarioRepository.save(voluntario);
    return voluntario;
  }

  public async update(voluntarioData: IUpdateVoluntario): Promise<Voluntario | undefined> {
    const voluntarioRepository = getRepository(Voluntario);
    const voluntario = await voluntarioRepository.findOne(voluntarioData.id);

    if (!voluntario) {
      throw new AppError('Voluntario ID does not exist', 404);
    }

    voluntario.email = voluntarioData.email;
    voluntario.nome = voluntarioData.nome;
    voluntario.profissao = voluntarioData.profissao;
    voluntario.senha = voluntarioData.senha;

    if (voluntarioData.isAdmin) {
      voluntario.isAdmin = voluntarioData.isAdmin
    }
    return voluntarioRepository.save(voluntario);
  }

  public async delete(id: string): Promise<void> {
    const voluntarioRepository = getRepository(Voluntario);
    const voluntario = await voluntarioRepository.findOne({id});
    if (!voluntario) {
      throw new AppError('Voluntario ID does not exist', 404);
    }
    await voluntarioRepository.delete({ id });
  }
}

export default VoluntarioService;
