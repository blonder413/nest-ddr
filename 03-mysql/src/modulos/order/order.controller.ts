import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order-dto';
import { ParseDatePipe } from 'src/pipes/parse-date.pipe';

@Controller('api/v1/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  createOrder(@Body() order: OrderDto) {
    return this.orderService.createOrder(order);
  }

  // @Get("confirmed")
  // getConfirmedOrders(){
  //   return this.orderService.getConfirmedOrders();
  // }

  @Get("confirmed")
  getConfirmedOrders(@Query('start', ParseDatePipe) start: Date, @Query('end', ParseDatePipe) end: Date){
    return this.orderService.getConfirmedOrders(start, end);
}

  @Get("pending")
  getPendingOrders(){
    return this.orderService.getPendingOrders();
  }

  @Get("/:id")
  getOrderById(@Param("id") id:string) {
    return this.orderService.getOrderById(id);
  }
}
