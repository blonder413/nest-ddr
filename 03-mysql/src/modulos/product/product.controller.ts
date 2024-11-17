import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';

@ApiTags('productos')
@Controller('api/v1/products')
export class ProductController {
  constructor(private productService: ProductService) {}
}
