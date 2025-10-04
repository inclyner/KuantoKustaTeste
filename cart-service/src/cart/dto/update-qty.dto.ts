import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
export class UpdateQtyDto {
  @ApiProperty({ minimum: 1, example: 3 })
  @Type(() => Number)
  @IsInt() @Min(1) quantity: number;
}
