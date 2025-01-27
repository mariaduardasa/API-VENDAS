import { dataSource } from 'src/shared/typeorm';
import AppError from 'src/shared/errors/AppError';
import Order from '../typeorm/entities/Order';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    // Obtenha o repositório da entidade Order
    const orderRepository = dataSource.getRepository(Order);

    // Verifique se o pedido existe
    const order = await orderRepository.findOne({
      where: { id },
      relations: ['customer', 'order_products'], // Inclua as relações necessárias
    });

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
