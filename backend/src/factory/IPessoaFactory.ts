import Usuario from "../models/Usuario";
import Voluntario from "../models/Voluntario";

export default interface IPessoaFactory {
  create(data: any): Promise<Usuario | Voluntario | undefined>;
  findById(id: string): Promise<Usuario | Voluntario | undefined>;
  update(data: any): Promise<Usuario | Voluntario | undefined>;
  delete(id:string): boolean;
}
