import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const avatarFilename = request.file?.filename;
    if (!avatarFilename) {
      // Retornar um erro caso o filename não esteja presente
      return response.status(400).json({ error: 'Avatar file is missing.' });
    }

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: avatarFilename,  // Garantir que é uma string
    });

    return response.json(user);
  }
}
