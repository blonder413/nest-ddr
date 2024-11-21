import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class OrderDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsDate()
  @Type(()=>Date)
  createAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(()=>Date)
  updateAt?: Date;
  
  @IsOptional()
  @IsDate()
  @Type(()=>Date)
  confirmAt?: Date;
}
