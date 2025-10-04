import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cart-item.entity';
import { Repository,DataSource } from 'typeorm';
import { AddItemDto } from './dto/add-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly carts: Repository<Cart>,
    @InjectRepository(CartItem) private readonly items: Repository<CartItem>,
    private readonly ds: DataSource,
  ) {}

  async ensureCart(userId: string): Promise<Cart> {
      if (!userId) throw new BadRequestException('Missing x-user-id');
    let cart = await this.carts.findOne({ where: { userId }, relations: { items: true } });
    if (!cart) {
      cart = this.carts.create({ userId, items: [] });
      await this.carts.save(cart);
    }
    return cart;
  }
  getMine(userId: string) {
    return this.ensureCart(userId);
  }

  async addItem(userId: string, dto: AddItemDto) {
  const cart = await this.ensureCart(userId);

  const existing = await this.items.findOne({
    where: { cartId: cart.id, productId: dto.productId },
  });

  if (existing) {
    existing.quantity += dto.quantity;
    await this.items.save(existing);
  } else {
    await this.items.save({
      cartId: cart.id,
      productId: dto.productId,
      quantity: dto.quantity,
    });
  }

  return this.getMine(userId);
}

  async setItemQuantity(userId: string, productId: string, quantity: number) {
    const cart = await this.ensureCart(userId);
    const item = await this.items.findOne({ where: { id: cart.id, productId } });
    if (!item) throw new NotFoundException('Item not in cart');
    item.quantity = quantity;
    await this.items.save(item);
    return this.getMine(userId);
  }

  async removeItem(userId: string, productId: string) {
    const cart = await this.ensureCart(userId);
    await this.items.delete({ id: cart.id, productId });
    return this.getMine(userId);
  }

  async clear(userId: string) {
    const cart = await this.ensureCart(userId);
    const res = await this.items.delete({ cartId: cart.id });
    return this.getMine(userId);
  }
}

