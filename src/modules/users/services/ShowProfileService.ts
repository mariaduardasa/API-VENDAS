import { DataSource } from 'typeorm';
import User from 'src/modules/users/typeorm/entities/User';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';

interface IRequest {
  user_id: string
}

class ShowProfileService {
  public async execute({user_id}: IRequest): Promise<User> {
    const userRepository = dataSource.getRepository(User);


    const user =  await userRepository.findOne({ where: { id: user_id } });

    if (!user){
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
