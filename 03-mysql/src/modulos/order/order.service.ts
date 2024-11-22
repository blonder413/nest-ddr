import { ConflictException, Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import {
  IsNull,
  LessThanOrEqual,
  MoreThanOrEqual,
  Not,
  Repository,
  UpdateResult,
} from 'typeorm';
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

  async getOrderById(id) {
    return this.orderRepository.findOne({ where: { id } });
  }

  // async getConfirmedOrders() {
  //   return this.orderRepository.find({ where: { confirmAt: Not(IsNull()) } });
  // }

  async getConfirmedOrders(start: Date, end: Date) {
    // si existe start y end, filtramos
    if (start || end) {
      // Creamos una query builder
      const query = this.orderRepository
        .createQueryBuilder('order')
        .leftJoinAndSelect('order.client', 'client')
        .leftJoinAndSelect('order.products', 'product')
        .orderBy('order.confirmAt');

      // Si existe start, filtramos
      if (start) {
        query.andWhere({ confirmAt: MoreThanOrEqual(start) });
      }

      // Si existe end, filtramos
      // ponemos las horas a 23:59:59
      if (end) {
        end.setHours(24);
        end.setMinutes(59);
        end.setSeconds(59);
        end.setMilliseconds(999);
        query.andWhere({ confirmAt: LessThanOrEqual(end) });
      }

      // Ejecutamos la consulta
      return await query.getMany();
    } else {
      return this.orderRepository.find({
        where: { confirmAt: Not(IsNull()) },
        order: { confirmAt: 'DESC' },
      });
    }
  }

  async getOrdersByClient(idClient: number) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.client', 'client')
      .leftJoinAndSelect('order.products', 'products')
      .where('client.id=:idClient', { idClient })
      .orderBy('order.confirmAt')
      .getMany();
  }

  async getPendingOrders() {
    return this.orderRepository.find({ where: { confirmAt: IsNull() } });
  }

  async confirmOrder(id: string) {
    const orderExists = await this.getOrderById(id);
    if (!orderExists) {
      throw new ConflictException(`La orden con el id ${id} no existe`);
    }
    if (orderExists.confirmAt) {
      throw new ConflictException(`La orden con id ${id} ya está confirmada`);
    }
    const rows: UpdateResult = await this.orderRepository.update(
      { id },
      { confirmAt: new Date() },
    );
    return rows.affected == 1;
  }
}
