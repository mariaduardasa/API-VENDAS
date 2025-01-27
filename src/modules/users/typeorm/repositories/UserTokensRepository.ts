import { DataSource, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

export class UserTokenRepository extends Repository<UserToken> {
  constructor(dataSource: DataSource) {
    super(UserToken, dataSource.manager);
  }

  public async findByToken(token: string): Promise<UserToken | null> {
    return this.findOne({ where: { token } });
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.create({ user_id });
    await this.save(userToken);
    return userToken;
  }
}
