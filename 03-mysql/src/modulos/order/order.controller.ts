import { Controller } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('api/v1/order')
export class OrderController {
  constructor(private oderService: OrderService) {}
}
