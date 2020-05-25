import { Router } from 'express';

import usuariosRouter from './usuarios.routes';
import voluntariosRouter from './voluntarios.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);
routes.use('/voluntarios', voluntariosRouter);

export default routes;
