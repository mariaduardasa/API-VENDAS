import { Repository } from 'typeorm';
import User from '../entities/User';

export class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | null> {
    return this.findOne({ where: { name } });
  }

  public async findById(id: string): Promise<User | null> {
    return this.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }
}
