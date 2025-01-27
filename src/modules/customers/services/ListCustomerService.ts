import { dataSource } from 'src/shared/typeorm';
import Customer from '../typeorm/entities/Customer';

//EXEMPLO PAGINAÇÂO
interface IPaginateCustomer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomerService {
  public async execute(page: number = 1, perPage: number = 10): Promise<IPaginateCustomer> {
    const customerRepository = dataSource.getRepository(Customer);

    // Calcular o offset
    const skip = (page - 1) * perPage;
    const take = perPage;

    // Buscar total de registros para calcular a paginação
    const [data, total] = await customerRepository.createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    // Calcular o total de páginas
    const totalPages = Math.ceil(total / perPage);

    return {
      from: skip + 1,
      to: skip + data.length,
      per_page: perPage,
      total,
      current_page: page,
      prev_page: page > 1 ? page - 1 : null,
      next_page: page < totalPages ? page + 1 : null,
      data
    };
  }
}

export default ListCustomerService;
