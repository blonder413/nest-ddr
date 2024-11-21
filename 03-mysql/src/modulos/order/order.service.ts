import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private clientService: ClientService,
    private productService: ProductService,
  ) {}
}
