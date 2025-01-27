import { DataSource } from 'typeorm';
import path from 'path';
import fs from 'fs/promises';
import User from 'src/modules/users/typeorm/entities/User';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';
import uploadConfig from 'src/config/upload';


interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOne({
      where: { id: user_id }  // Usar a opção `where` para buscar por id
    });

    if (!user){
      throw new AppError('User not found.')
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      try {
        await fs.stat(userAvatarFilePath);  // Verificar a existência do arquivo
        await fs.unlink(userAvatarFilePath);  // Excluir o arquivo
      } catch (err) {

        // Se o arquivo não existir, não faça nada

      }
    }

    user.avatar = avatarFilename;

    await userRepository.save(user);

    return user;

  }
}

export default UpdateUserAvatarService;
