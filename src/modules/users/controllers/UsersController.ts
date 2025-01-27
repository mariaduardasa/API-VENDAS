import { Request, Response } from 'express';
import CreateUserService from 'src/modules/users/services/CreateUserService';
import ListUserService from 'src/modules/users/services/ListUserService';
import { plainToClass } from 'class-transformer'
import User from '../typeorm/entities/User';

export default class UsersController{
  public async index(request: Request, response: Response): Promise<Response>{
    const listUsers = new ListUserService();

    const users = await listUsers.execute()

    return response.json(plainToClass(User, users));
  }

  public async create(request: Request, response: Response): Promise<Response>{
    const {name, email, password} = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password
    });
    return response.json(plainToClass(User, user));
  }

}
