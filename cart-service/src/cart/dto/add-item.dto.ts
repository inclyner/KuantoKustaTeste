import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID, IsInt, Min } from 'class-validator';
export class AddItemDto {
  @ApiProperty({ format: 'uuid', example: '8ebb223e-9d8b-4ae8-b16a-687425d23a25' })
  @IsUUID() productId: string;
  
  @ApiProperty({ minimum: 1, example: 2 })
  @Type(() => Number)
  @IsInt() @Min(1) quantity: number;
}
