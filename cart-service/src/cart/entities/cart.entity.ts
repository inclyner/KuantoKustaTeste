import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn, Index } from 'typeorm';
import { CartItem } from './cart-item.entity';


@Entity({ name: 'carts' })
@Index('uq_cart_user', ['userId'], { unique: true })
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @OneToMany(() => CartItem, item => item.cart, { cascade: true })
  items: CartItem[];
}