import { DataSource } from 'typeorm';
import Product from 'src/modules/products/typeorm/entities/Product';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';


class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = dataSource.getRepository(Product);


    const products = productRepository.find();

    return products;
  }
}

export default ListProductService;
