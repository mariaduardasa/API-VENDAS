import { DataSource } from 'typeorm';
import User from 'src/modules/users/typeorm/entities/User';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from 'src/config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse{
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    // Utilize o repositório padrão para a entidade Product
    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    //bcrypt na senha
    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token
    };

  }
}

export default CreateSessionService;
