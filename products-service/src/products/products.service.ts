import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return this.productModel.create(createProductDto);
  }

  async findAll() {
    const res = await this.productModel.find();
    if (res.length === 0) throw new NotFoundException('Products not found');
    return res;
  }

  async findOne(productId: string) {
     const res = await this.productModel.findOne({ productId });
    if (!res) throw new NotFoundException('Product not found');
    return res;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updated = await this.productModel.findByIdAndUpdate(
      { productId: id },
      updateProductDto,
    );
    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async remove(productId: string) {
    const res = await this.productModel.deleteOne({ productId: productId });
    if (res.deletedCount === 0)
      throw new NotFoundException('Product not found');

    return `This action removed the #${productId} product`;
  }

  async seed() {
    const count = await this.productModel.countDocuments();
    if (count === 0) {
      await this.productModel.insertMany([
        { productId: 'p1', name: 'Laptop', price: 1200 },
        { productId: 'p2', name: 'Phone', price: 800 },
      ]);
    }
  }
}
