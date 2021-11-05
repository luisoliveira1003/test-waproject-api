import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { IWish } from 'modules/database/interfaces/wish';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const wishs = await knex
    .count()
    .from('Wish')
    .first();

  if (Number(wishs.count) !== 1) return;

  for (let x = 0; x < 100; x++) {
    const description = faker.commerce.productName();
    const amount = `${x++}`;
    const price = `${x++}.00`;

    const wish: IWish = {
      amount,
      description,
      price,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(wish).into('Wish');
  }
}
