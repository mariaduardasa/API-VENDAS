import { Repository, In } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

export class ProductsRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | null> {
    return this.findOne({ where: { name } });
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productsIds),
      },
    });

    return existsProducts;
  }
}
