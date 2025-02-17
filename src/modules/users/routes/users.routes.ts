import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from 'src/config/upload';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();
const usersController = new UsersController
const usersAvatarController = new UsersAvatarController()

const upload = multer(uploadConfig);

//USERS
//listar
usersRouter.get("/", isAuthenticated, usersController.index);

//criar
usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  }),
  usersController.create
);

//AVATAR
usersRouter.patch(
  '/avatar',
  //isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);


export default usersRouter;
