import { DataSource } from 'typeorm';
import User from 'src/modules/users/typeorm/entities/User';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';


class ListUserService {
  public async execute(): Promise<User[]> {
    const userRepository = dataSource.getRepository(User);


    const users = userRepository.find();

    return users;
  }
}

export default ListUserService;
