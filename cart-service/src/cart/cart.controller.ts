import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { UserId } from 'src/auth/user-id.decorator';
import { AddItemDto } from './dto/add-item.dto';
import { UpdateQtyDto } from './dto/update-qty.dto';
import { ApiBadRequestResponse, ApiHeader, ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';


@ApiTags('cart')
@ApiSecurity('x-user-id')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}
  @ApiHeader({ name: 'x-user-id', required: true, description: 'User UUID' })
  @ApiOkResponse({ description: 'Return the current user cart' })
  @ApiBadRequestResponse({ description: 'Missing x-user-id' })
  @Get('me')
  getMine(@UserId() userId: string) {
    return this.cartService.getMine(userId);
  }

  @ApiOkResponse({ description: 'Add or increase an item' })
  @ApiHeader({ name: 'x-user-id', required: true, description: 'User UUID' })
  @Post('items')
  addItem(@UserId() userId: string, @Body() dto: AddItemDto) {
    return this.cartService.addItem(userId, dto);
  }

  @ApiHeader({ name: 'x-user-id', required: true, description: 'User UUID' })
  @ApiOkResponse({ description: 'Set item quantity' })
  @Patch('items/:productId')
  setQty(
    @UserId() userId: string,
    @Param('productId') productId: string,
    @Body() dto: UpdateQtyDto,
  ) {
    return this.cartService.setItemQuantity(userId, productId, dto.quantity);
  }

  @ApiHeader({ name: 'x-user-id', required: true, description: 'User UUID' })
  @ApiOkResponse({ description: 'Remove one item' })
  @Delete('items/:productId')
  removeItem(@UserId() userId: string, @Param('productId') productId: string) {
    return this.cartService.removeItem(userId, productId);
  }

  @ApiHeader({ name: 'x-user-id', required: true, description: 'User UUID' })
  @ApiOkResponse({ description: 'Clear all items' })
  @Delete('items')
  clear(@UserId() userId: string) {
    return this.cartService.clear(userId);
  }
}
