import { Repository } from 'typeorm';
import Order from '../entities/Order';
import Customer from 'src/modules/customers/typeorm/entities/Customer';

interface IProduct{
  product_id: string;
  price: number;
  quantity: number;
}
interface IRequest{
  customer: Customer;
  products: IProduct[];
}

export class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | null> {
    return this.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });
  }

  public async createOrder({customer, products}: IRequest): Promise<Order> {
    const order= this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}
