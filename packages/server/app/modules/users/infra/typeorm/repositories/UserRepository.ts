import { Repository } from 'typeorm';

import { DeepPartial } from '~/common';
import { UserRepository } from '~/modules/users/data';
import { UserModel } from '~/modules/users/domain';

import { UserEntity } from '../entities';

export class TypeORMUserRepository implements UserRepository {
  constructor(private readonly typeORMRepository: Repository<UserEntity>) {}

  public async create(partial: DeepPartial<UserModel>): Promise<UserModel> {
    const user = this.typeORMRepository.create(partial);
    await this.typeORMRepository.save(user);

    return user;
  }

  public findUserByEmail(email: string): Promise<UserModel> {
    return this.typeORMRepository.findOne({ where: { email } });
  }
}
