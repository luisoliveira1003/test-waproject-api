import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IWish } from 'modules/database/interfaces/wish';
import { Wish } from 'modules/database/models/wish';
import { Page, Transaction } from 'objection';

@Injectable()
export class WishRepository {
  public async list(params: IPaginationParams, transaction?: Transaction): Promise<Page<Wish>> {
    let query = Wish.query(transaction)
      .select('*')
      .page(params.page, params.pageSize);

    if (params.orderBy) {
      if (params.orderBy !== 'description') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      } else {
        query = query.orderBy('amount', params.orderDirection).orderBy('price', params.orderDirection);
      }
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('description', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async count(transaction?: Transaction): Promise<Number> {
    const result: any = await Wish.query(transaction)
      .count('id as count')
      .first();

    return Number(result.count);
  }

  public async findById(id: number, transaction?: Transaction): Promise<Wish> {
    return Wish.query(transaction)
      .where({ id })
      .first();
  }

  public async insert(model: IWish, transaction?: Transaction): Promise<Wish> {
    return Wish.query(transaction).insert(model);
  }

  public async update(model: IWish, transaction?: Transaction): Promise<Wish> {
    return Wish.query(transaction).updateAndFetchById(model.id, <Wish>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Wish.query(transaction)
      .del()
      .where({ id });
  }
}
