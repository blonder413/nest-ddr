import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order-dto';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private oderService: OrderService) {}

  @Post()
  createOrder(@Body() order: OrderDto) {
    return this.oderService.createOrder(order);
  }

  @Get("pending")
  getPendingOrders(){
    return this.oderService.getPendingOrders();
  }

  @Get("/:id")
  getOrderById(@Param("id") id:string) {
    return this.oderService.getOrderById(id);
  }
}
