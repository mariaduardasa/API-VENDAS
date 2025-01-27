import { Router } from 'express';
import customersRouter from 'src/modules/customers/routes/customers.routes';
import ordersRouter from 'src/modules/orders/routes/orders.routes';
import productsRouter from 'src/modules/products/routes/products.routes';
import passwordRouter from 'src/modules/users/routes/password.routes';
import profileRouter from 'src/modules/users/routes/profile.routes';
import sessionsRouter from 'src/modules/users/routes/sessions.routes';
import usersRouter from 'src/modules/users/routes/users.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)
routes.use('/customers', customersRouter)
routes.use('/orders', ordersRouter)



export default routes;

