import Product from 'src/modules/products/typeorm/entities/Product';
import dataSource from "src/shared/typeorm/ormconfig";
import AppError from "src/shared/errors/AppError";

interface IRequest{
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = dataSource.getRepository(Product);

    const product = await productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ShowProductService;
