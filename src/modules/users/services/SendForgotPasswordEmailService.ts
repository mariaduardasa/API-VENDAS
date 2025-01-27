import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';
import path from 'path';
import User from 'src/modules/users/typeorm/entities/User';
import EtherealMail from 'src/config/mail/EtherealMail';

import { UserTokenRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = dataSource.getRepository(User);
    const userTokenRepository = new UserTokenRepository(dataSource);

    // Encontre o usuário pelo email
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('User does not exist.');
    }

    // Gere o token utilizando o repositório personalizado
    const { token } = await userTokenRepository.generate(user.id); // Ajuste aqui para desestruturar o token

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    // Prepare o objeto para o e-mail
    const mailData = {
      to: {
        name: user.name,
        email: user.email,
      },
      from: {
        name: 'Equipe API Vendas',
        email: 'equipe@apivendas.com.br',
      },
      subject: '[API VENDAS] Redefinição de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`, // `token` agora é garantido ser uma string
        },
      },
    };

    // Envia o e-mail
    await EtherealMail.sendMail(mailData);
  }
}

export default SendForgotPasswordEmailService;
