import { DataSource } from 'typeorm';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';
import Customer from '../typeorm/entities/Customer';



interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    // Utilize o repositório padrão para a entidade Product
    const customerRepository = dataSource.getRepository(Customer);

    const emailExists = await customerRepository.findOne({
      where: { email },
    });

    if (emailExists) {
      throw new AppError('Email address already used.');
    }


    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;

  }
}

export default CreateCustomerService;
