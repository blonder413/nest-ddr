import { ConflictException, Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order-dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private clientService: ClientService,
    private productService: ProductService,
  ) {}

  async createOrder(order: OrderDto) {
    const clientExists = await this.clientService.findClientById(
      order.client.id,
    );
    if (!clientExists) {
      throw new ConflictException(
        `El cliente con id ${order.client.id} no existe`,
      );
    }
    for (const p of order.products) {
      const product = await this.productService.findProduct(p.id);
      if (!product) {
        throw new ConflictException(`El producto con id ${p.id} no existe`);
      } else if (product.deleted) {
        throw new ConflictException(`El producto con id ${p.id} está borrado`);
      }
    }
    return this.orderRepository.save(order);
  }
}
