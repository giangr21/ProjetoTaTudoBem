import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';

const usuariosRouter = Router();
const usuarioController = new UsuarioController();

usuariosRouter.post('/', usuarioController.create);
usuariosRouter.put('/', usuarioController.update);
usuariosRouter.delete('/:id', usuarioController.delete);

export default usuariosRouter;
