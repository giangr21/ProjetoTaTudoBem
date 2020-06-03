import { Router } from 'express';

import usuariosRouter from './usuarios.routes';
import voluntariosRouter from './voluntarios.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);
routes.use('/voluntarios', voluntariosRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
