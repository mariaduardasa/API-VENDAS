import { DataSource } from 'typeorm';
import Product from 'src/modules/products/typeorm/entities/Product';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = dataSource.getRepository(Product);

    const product = await productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await productRepository.findOne({
      where: { name },
    });

    if (productExists && productExists.id !== id) {
      throw new AppError('There is already a product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
