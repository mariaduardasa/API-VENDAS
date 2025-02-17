import 'reflect-metadata';
import 'dotenv/config';
import express, {NextFunction, Request, Response} from 'express';
import 'express-async-errors';
import cors from  'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '../errors/AppError';
import '../typeorm';
import uploadConfig from 'src/config/upload';
import { pagination } from 'typeorm-pagination';


const app = express();

app.use(cors());
app.use(express.json());

app.use(pagination);

app.use('files', express.static(uploadConfig.directory));

app.use(routes);

app.use(errors());

app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (error instanceof AppError){
      return response.status(error.StatusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('server started on port 3333')
});

export default routes
