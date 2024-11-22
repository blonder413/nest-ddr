import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order-dto';
import { ParseDatePipe } from 'src/pipes/parse-date.pipe';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Ordenes')
@Controller('api/v1/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiOperation({
    description: 'Crea una orden',
  })
  @ApiBody({
    description: 'Crea una orden usando un OrderDto',
    type: OrderDto,
    examples: {
      ejemplo1: {
        value: {
          client: {
            id: 1,
          },
          products: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
      },
      ejemplo2: {
        value: {
          confirmAt: '2024-04-13',
          client: {
            id: 1,
          },
          products: [
            {
              id: 1,
            },
            {
              id: 2,
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Crea la orden correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `El cliente no existe<br>El producto no existe<br>El producto está borrado`,
  })
  createOrder(@Body() order: OrderDto) {
    return this.orderService.createOrder(order);
  }

  // @Get("confirmed")
  // getConfirmedOrders(){
  //   return this.orderService.getConfirmedOrders();
  // }

  @Get('/client/:idClient')
  @ApiOperation({
    description: 'Devuelve todas las órdenes de un cliente',
  })
  @ApiParam({
    name: 'idClient',
    type: Number,
    required: true,
    description: 'id del cliente',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la información correctamente',
  })
  getOrderByClient(@Param('idClient') idClient: number) {
    return this.orderService.getOrdersByClient(idClient);
  }

  @Get('confirmed')
  @ApiOperation({
    description:
      'Devuelve todas las órdenes confirmadas, pudiendo definir un rango de fechas',
  })
  @ApiQuery({
    name: 'start',
    type: Date,
    required: false,
    description: 'Trae las órdenes con fecha confirmada superior a la dada',
  })
  @ApiQuery({
    name: 'end',
    type: Date,
    required: false,
    description: 'Trae las órdenes con fecha confirmada inferior a la dada',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la información correctamente',
  })
  getConfirmedOrders(
    @Query('start', ParseDatePipe) start: Date,
    @Query('end', ParseDatePipe) end: Date,
  ) {
    return this.orderService.getConfirmedOrders(start, end);
  }

  @Get('pending')
  @ApiOperation({
    description: 'Devuelve todas las órdenes pendientes de confirmar',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la información correctamente',
  })
  getPendingOrders() {
    return this.orderService.getPendingOrders();
  }

  @Get('/:id')
  @ApiOperation({
    description: 'Devuelve la información de una orden dado un id',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Id de la orden',
  })
  @ApiResponse({
    status: 200,
    description: 'Devuelve la información correctamente',
  })
  getOrderById(@Param('id') id: string) {
    return this.orderService.getOrderById(id);
  }

  @Patch('/confirm/:id')
  @ApiOperation({
    description: 'Confirma una orden',
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'id de la orden',
  })
  @ApiResponse({
    status: 200,
    description: 'Confirma correctamente',
  })
  @ApiResponse({
    status: 409,
    description: `La orden no existe<br>La orden ya está confirmada`,
  })
  confirmOrder(@Param('id') id: string) {
    return this.orderService.confirmOrder(id);
  }
}
