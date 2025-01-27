import { DataSource } from 'typeorm';
import Product from 'src/modules/products/typeorm/entities/Product';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';

interface IRequest{
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productRepository = dataSource.getRepository(Product);

    const product = await productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    await productRepository.remove(product);

  }
}

export default DeleteProductService;
