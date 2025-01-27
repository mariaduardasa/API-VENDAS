import { Repository } from 'typeorm';
import Customer from '../entities/Customer';

export class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | null> {
    return this.findOne({ where: { name } });
  }

  public async findById(id: string): Promise<Customer | null> {
    return this.findOne({ where: { id } });
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    return this.findOne({ where: { email } });
  }
}

export default CustomersRepository;
