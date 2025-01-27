import { DataSource } from 'typeorm';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';
import { compare, hash } from 'bcryptjs';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = dataSource.getRepository(Customer);

    const customer = await customerRepository.findOne({ where: { id: id } });

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await customerRepository.findOne({ where: { email } });

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one user with this email.');
    }

    // Corrigindo o nome de 'costumer' para 'customer'
    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
