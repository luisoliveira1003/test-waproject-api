import { Injectable, NotFoundException } from '@nestjs/common';
import { IWish } from 'modules/database/interfaces/wish';
import { Wish } from 'modules/database/models/wish';
import { WishRepository } from '../repositories/wish';

@Injectable()
export class WishService {
  constructor(private wishRepository: WishRepository) {}

  public async save(model: IWish): Promise<Wish> {
    if (model.id) return this.update(model);
    return this.create(model);
  }

  public async remove(wishId: number): Promise<void> {
    const wish = await this.wishRepository.findById(wishId);

    if (!wish) {
      throw new NotFoundException('not-found');
    }

    return this.wishRepository.remove(wishId);
  }

  private async create(model: IWish): Promise<Wish> {
    const wish = await this.wishRepository.insert(model);

    return wish;
  }

  private async update(model: IWish): Promise<Wish> {
    const wish = await this.wishRepository.findById(model.id);

    if (!wish) throw new NotFoundException('not-found');

    return this.wishRepository.update({ ...wish, ...model });
  }
}
