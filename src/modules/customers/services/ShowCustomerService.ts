import { DataSource } from 'typeorm';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  id: string
}

class ShowCustomerService {
  public async execute({id}: IRequest): Promise<Customer> {
    const customerRepository = dataSource.getRepository(Customer);


    const customer =  await customerRepository.findOne({ where: { id } });

    if (!customer){
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
