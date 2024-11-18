import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entity/product.entity';
import { Repository, UpdateResult } from 'typeorm';
import { ProductDto } from './dto/product-dto';
import { StockDto } from './dto/stock-dto';

@Injectable()
export class ProductService {
  private MIN_STOCK: number = 0;
  private MAX_STOCK: number = 1000;
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

  async restoreProduct(id: number) {
    const productExists: ProductDto = await this.findProduct(id);

    if (!productExists) {
      throw new ConflictException(`el producto con el id ${id} no existe`);
    } else if (!productExists.deleted) {
      throw new ConflictException(`el producto no está borrado`);
    }
    const rows: UpdateResult = await this.productRepository.update(
      { id },
      { deleted: false },
    );
    return rows.affected == 1;
  }

  async updateStock(stock: StockDto) {
    const product: ProductDto = await this.findProduct(stock.id);
    if (!product) {
      throw new ConflictException(`El producto con id ${stock.id} no existe`);
    }
    if (product.deleted) {
      throw new ConflictException(
        `El producto con id ${stock.id} está borrado`,
      );
    }
    const rows: UpdateResult = await this.productRepository.update(
      { id: stock.id },
      { stock: stock.stock },
    );
    return rows.affected == 1;
  }

  async incrementStock(stock: StockDto) {
    const product: ProductDto = await this.findProduct(stock.id);
    if (!product) {
      throw new ConflictException(`El producto con id ${stock.id} no existe`);
    }
    if (product.deleted) {
      throw new ConflictException(
        `El producto con id ${stock.id} está borrado`,
      );
    }
    let cantidad = 0;
    if (stock.stock + product.stock > this.MAX_STOCK) {
      cantidad = this.MAX_STOCK;
    } else {
      cantidad = stock.stock + product.stock;
    }

    const rows: UpdateResult = await this.productRepository.update(
      { id: stock.id },
      { stock: cantidad },
    );
    return rows.affected == 1;
  }

  async decrementStock(stock: StockDto) {
    const product: ProductDto = await this.findProduct(stock.id);
    if (!product) {
      throw new ConflictException(`El producto con id ${stock.id} no existe`);
    }
    if (product.deleted) {
      throw new ConflictException(
        `El producto con id ${stock.id} está borrado`,
      );
    }
    let cantidad = 0;
    if (product.stock - stock.stock < this.MIN_STOCK) {
      cantidad = this.MIN_STOCK;
    } else {
      cantidad = product.stock - stock.stock;
    }
    const rows: UpdateResult = await this.productRepository.update(
      { id: stock.id },
      { stock: cantidad },
    );
    return rows.affected == 1;
  }
}
