import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';
import User from 'src/modules/users/typeorm/entities/User';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { UserTokenRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {

    const userRepository = dataSource.getRepository(User);
    const userTokenRepository = new UserTokenRepository(dataSource);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exist.');
    }

    // Corrigir a obtenção do usuário
    const user = await userRepository.findOne({ where: { id: userToken.user_id } });

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)){
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);

    // Salvar a nova senha do usuário
    await userRepository.save(user);
  }
}

export default ResetPasswordService;
