import { getRepository } from 'typeorm';
// import AppError from '../errors/AppError';
import IPessoaRepository from '../factory/IPessoaFactory';
import Voluntario from '../models/Voluntario';

class VoluntarioService implements IPessoaRepository{

  constructor() {

  }

  public async findById(id: string): Promise<Voluntario | undefined>{
    const VoluntarioRepository = getRepository(Voluntario);
    const voluntarios = await VoluntarioRepository.find();
    return voluntarios;
    // TO DO
  }
  public async create(data: any): Promise<Voluntario | undefined> {
    // TO DO
  }
  public async update(data: any): Promise<Voluntario | undefined> {
    // TO DO

  }
  public async delete(id: string): boolean {
    return true;
    // TO DO
  }
}

export default VoluntarioService;
