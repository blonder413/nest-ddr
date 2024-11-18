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
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product-dto';

@ApiTags('productos')
@Controller('api/v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Get('/deleted')
  getDeleted() {
    return this.productService.findDeleted();
  }

  @Get('/:id')
  getProductById(@Param('id') id: number) {
    return this.productService.findProduct(id);
  }

  @Get()
  getProducts() {
    return this.productService.findAll();
  }

  @Put()
  updateProduct(@Body() product: ProductDto) {
    return this.productService.updateProduct(product);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.softDeleteProduct(id);
  }

  @Patch('/restore/:id')
  restoreProduct(@Param('id') id: number) {
    return this.productService.restoreProduct(id);
  }
}
