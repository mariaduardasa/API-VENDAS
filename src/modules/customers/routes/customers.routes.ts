import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';


const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated);

//listar
customersRouter.get("/", customersController.index);

//listar por id
customersRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  customersController.show
);

//criar
customersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    }
  }),
  customersController.create
);

//atualiazar
customersRouter.put(
  "/:id",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  customersController.update
);

//deletar
customersRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  customersController.delete
);

export default customersRouter;
