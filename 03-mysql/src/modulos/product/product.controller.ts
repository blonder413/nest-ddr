import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product-dto';
import { StockDto } from './dto/stock-dto';

@ApiTags('productos')
@Controller('api/v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiBody({
    description: 'Crea un producto mediante un ProductDto',
    type: ProductDto,
    examples: {
      ejemplo1: {
        value: {
          "name": "producto ejemplo",
          "price": 810,
          "stock": 13
        },
      },
    },
  })
  @ApiOperation({
    description: 'crea un producto',
  })
  @ApiResponse({
    status: 201,
    description: "El producto se ha creado correctamente"
  })
  @ApiResponse({
    status: 409,
    description: "El producto existe"
  })
  @Post()
  createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }


  @ApiOperation({
    description: "lista todos los productos borrados"
  })
  @Get('/deleted')
  getDeleted() {
    return this.productService.findDeleted();
  }


  @ApiOperation({
    description: "lista producto buscando por id"
  })
  @ApiParam({
    description: "id del producto",
    name: "id",
    required: true,
    type: Number
  })
  @ApiResponse({
    status: 200,
    description: "Devuelve la información solicitada"
  })
  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.findProduct(id);
  }


  @ApiOperation({
    description: "lista todos los productos no borrados"
  })
  @ApiResponse({
    status: 200,
    description: "Devuelve la información solicitada"
  })
  @Get()
  getProducts() {
    return this.productService.findAll();
  }


  @ApiBody({
    description: 'Actualiza un producto mediante un ProductDto, si no se envía el id se crea',
    type: ProductDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 1,
          "name": "producto actualizado",
          "price": 810,
          "stock": 13
        },
      },
      ejemplo2: {
        value: {
          "name": "producto nuevo",
          "price": 810,
          "stock": 13
        },
      },
    },
  })
  @ApiOperation({
    description: "actualiza un producto, si no existe se crea"
  })
  @ApiResponse({
    status: 200,
    description: "Se ha actualizado correctamente"
  })
  @Put()
  updateProduct(@Body() product: ProductDto) {
    return this.productService.updateProduct(product);
  }


  @ApiParam({
    description: "id del producto",
    name: "id",
    required: true,
    type: Number
  })
  @ApiOperation({
    description: "Borra un producto (soft delete)"
  })
  @ApiResponse({
    status: 200,
    description: "Se ha borrado correctamente"
  })
  @ApiResponse({
    status: 409,
    description: `El producto no existe<br>
                  El producto ya está borrado`
  })
  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.softDeleteProduct(id);
  }


  @ApiOperation({
    description: "Recupera un producto borrado"
  })
  @ApiResponse({
    status: 200,
    description: "Se ha restaurado correctamente"
  })
  @ApiResponse({
    status: 409,
    description: `El producto no existe<br>
                  El producto no está borrado`
  })
  @Patch('/restore/:id')
  restoreProduct(@Param('id') id: number) {
    return this.productService.restoreProduct(id);
  }


  @ApiBody({
    description: 'Actualiza el stock de un producto mediante un StockDto',
    type: StockDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 4,
	        "stock": 10
        },
      }
    },
  })
  @ApiOperation({
    description: "Actualiza el stock de un producto"
  })
  @ApiResponse({
    status: 200,
    description: "Se ha actualizado el stock"
  })
  @ApiResponse({
    status: 409,
    description: `El producto no existe<br>
                  El producto está borrado`
  })
  @Patch('/stock')
  updateStock(@Body() stock: StockDto) {
    return this.productService.updateStock(stock);
  }


  @ApiBody({
    description: 'Incrementa el stock de un producto mediante un StockDto',
    type: StockDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 4,
	        "stock": 10
        },
      }
    },
  })
  @Patch('/increment-stock')
  @ApiResponse({
    status: 200,
    description: "Se ha incrementado el stock"
  })
  @ApiResponse({
    status: 409,
    description: `El producto no existe<br>
                  El producto está borrado`
  })
  incrementStock(@Body() stock: StockDto) {
    return this.productService.incrementStock(stock);
  }


  @ApiBody({
    description: 'Decrementa el stock de un producto mediante un StockDto',
    type: StockDto,
    examples: {
      ejemplo1: {
        value: {
          "id": 4,
	        "stock": 10
        },
      }
    },
  })
  @ApiResponse({
    status: 200,
    description: "Se ha decrementado el stock"
  })
  @ApiResponse({
    status: 409,
    description: `El producto no existe<br>
                  El producto está borrado`
  })
  @Patch('/decrement-stock')
  decrementStock(@Body() stock: StockDto) {
    return this.productService.decrementStock(stock);
  }
}
