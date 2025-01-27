import { DataSource } from 'typeorm';
import User from 'src/modules/users/typeorm/entities/User';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;

}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    // Utilize o repositório padrão para a entidade Product
    const userRepository = dataSource.getRepository(User);

    const emailExists = await userRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    //bcrypt na senha
    const hashedPassword = await hash(password, 8);

    // Crie a instância do usuario
    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    // Salve o usuario no banco de dados
    await userRepository.save(user);

    return user;

  }
}

export default CreateUserService;
