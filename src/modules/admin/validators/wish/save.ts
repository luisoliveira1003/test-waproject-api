import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';
import { IWish } from 'modules/database/interfaces/wish';

export class SaveValidator implements IWish {
  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiProperty({ required: false, type: 'integer' })
  public id?: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  @ApiProperty({ required: true, type: 'string', minLength: 3, maxLength: 150 })
  public description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true, type: 'number' })
  public amount: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: 'decimal' })
  public price: string;
}
