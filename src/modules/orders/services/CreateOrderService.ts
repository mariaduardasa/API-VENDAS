import { dataSource } from 'src/shared/typeorm';
import AppError from 'src/shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import Customer from 'src/modules/customers/typeorm/entities/Customer';
import Product from 'src/modules/products/typeorm/entities/Product';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository = dataSource.getRepository(Order);
    const customerRepository = dataSource.getRepository(Customer);
    const productRepository = dataSource.getRepository(Product);

    // Verifique se o cliente existe
    const customerExists = await customerRepository.findOne({
      where: { id: customer_id },
    });

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    // Verifique se os produtos existem
    const existsProducts = await productRepository.findByIds(products.map(product => product.id));

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    // Verifique se há produtos inexistentes
    const existsProductIds = existsProducts.map(product => product.id);
    const checkInexistentProducts = products.filter(
      product => !existsProductIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}.`);
    }

    // Verifique a disponibilidade de quantidade
    const quantityAvailable = products.filter(
      product => existsProducts.filter(
        p => p.id === product.id
      )[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`);
    }

    // Serializar os produtos para a ordem
    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    // Criar a ordem
    const order = orderRepository.create({
      customer: customerExists,
      order_products: serializedProducts,
    });

    await orderRepository.save(order);

    // Atualizar a quantidade dos produtos
    const { order_products } = order;

    const updatedProductQuantity = order_products.map(
      product => ({
        id: product.product_id,
        quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
      })
    );

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
