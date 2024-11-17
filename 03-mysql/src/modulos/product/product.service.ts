import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProduct(product: ProductDto) {
    const productExists: ProductDto = await this.findProduct(product.id);
    
    if (productExists.id == product.id) {
      throw new ConflictException(`el producto con el id ${product.id} ya existe`);
    }
    return await this.productRepository.save(product);
  }

  async findProduct(id: number) {
    return await this.productRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.productRepository.find({ where: { deleted: false } });
  }

  async findDeleted() {
    return await this.productRepository.find({ where: { deleted: true } });
  }
}
