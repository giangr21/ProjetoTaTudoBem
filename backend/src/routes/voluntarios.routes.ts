import { Router } from 'express';
import VoluntarioController from '../controllers/VoluntarioController';

const voluntariosRouter = Router();
const voluntarioController = new VoluntarioController();

voluntariosRouter.post('/', voluntarioController.create);
voluntariosRouter.put('/', voluntarioController.update);
voluntariosRouter.delete('/:id', voluntarioController.delete);

export default voluntariosRouter;
