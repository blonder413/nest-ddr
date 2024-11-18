import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProduct(product: ProductDto) {
    const productExists: ProductDto = await this.findProduct(product.id);

    if (product.id != undefined) {
      if (productExists != null) {
        throw new ConflictException(
          `el producto con el id ${product.id} ya existe`,
        );
      }
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

  async updateProduct(product: ProductDto) {
    return await this.productRepository.save(product);
  }

  async softDeleteProduct(id: number) {
    const productExists: ProductDto = await this.findProduct(id);

    if (!productExists) {
      throw new ConflictException(`el producto con el id ${id} no existe`);
    } else if (productExists.deleted) {
      throw new ConflictException(`el producto ya está borrado`);
    }
    const rows: UpdateResult = await this.productRepository.update(
      { id },
      { deleted: true },
    );
    return rows.affected == 1;
  }
}
