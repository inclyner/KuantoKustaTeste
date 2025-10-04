import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UserId } from 'src/auth/user-id.decorator';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateQtyDto } from './dto/update-qty.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('me')
  getMine(@UserId() userId: string) {
    return this.cartService.getMine(userId);
  }

  @Post('items')
  addItem(@UserId() userId: string, @Body() dto: AddItemDto) {
    return this.cartService.addItem(userId, dto);
  }

  @Patch('items/:productId')
  setQty(
    @UserId() userId: string,
    @Param('productId') productId: string,
    @Body() dto: UpdateQtyDto,
  ) {
    return this.cartService.setItemQuantity(userId, productId, dto.quantity);
  }

  @Delete('items/:productId')
  removeItem(@UserId() userId: string, @Param('productId') productId: string) {
    return this.cartService.removeItem(userId, productId);
  }

  @Delete('items')
  clear(@UserId() userId: string) {
    return this.cartService.clear(userId);
  }
}
