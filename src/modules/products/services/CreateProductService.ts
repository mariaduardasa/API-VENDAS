import { DataSource } from 'typeorm';
import Product from 'src/modules/products/typeorm/entities/Product';
import AppError from 'src/shared/errors/AppError';
import { dataSource } from 'src/shared/typeorm';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    // Utilize o repositório padrão para a entidade Product
    const productRepository = dataSource.getRepository(Product);

    // Encontre um produto pelo nome
    const productExists = await productRepository.findOne({
      where: { name },
    });

    if (productExists) {
      throw new AppError('There is already a product with this name');
    }

    // Crie a instância do produto
    const product = productRepository.create({
      name,
      price,
      quantity,
    });

    // Salve o produto no banco de dados
    await productRepository.save(product);

    return product;
  }
}

export default CreateProductService;
