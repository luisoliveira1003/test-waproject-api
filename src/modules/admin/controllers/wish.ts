import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired } from 'modules/common/guards/token';
import { enRoles } from 'modules/database/interfaces/user';
import { Wish } from 'modules/database/models/wish';
import { WishRepository } from '../repositories/wish';
import { WishService } from '../services/wish';
import { ListValidator } from '../validators/wish/list';
import { SaveValidator } from '../validators/wish/save';

@ApiTags('Admin: Wish')
@Controller('/wish')
@AuthRequired([enRoles.admin])
export class WishController {
  constructor(private wishRepository: WishRepository, private wishService: WishService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Wish] })
  public async list(@Query() model: ListValidator) {
    return this.wishRepository.list(model);
  }

  @Get(':wishId')
  @ApiResponse({ status: 200, type: Wish })
  public async details(@Param('wishId', ParseIntPipe) wishId: number) {
    return this.wishRepository.findById(wishId);
  }

  @Delete(':wishId')
  public async delete(@Param('wishId', ParseIntPipe) wishId: number) {
    return this.wishService.remove(wishId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Wish })
  public async save(@Body() model: SaveValidator) {
    return this.wishService.save(model);
  }
}
