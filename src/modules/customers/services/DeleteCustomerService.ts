import { DataSource } from 'typeorm';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  id: string
}

class DeleteCustomerService {
  public async execute({id}: IRequest): Promise<void> {
    const customerRepository = dataSource.getRepository(Customer);


    const customer =  await customerRepository.findOne({ where: { id: id } });

    if (!customer){
      throw new AppError('Customer not found.');
    }

    await customerRepository.remove(customer);
  }
}

export default DeleteCustomerService;
