import { PrismaClient } from '@prisma/client';

import { DeepPartial } from '~/common';
import { UserRepository } from '~/modules/users/data';
import { UserModel } from '~/modules/users/domain';

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public create(partial: DeepPartial<UserModel>): Promise<UserModel> {
    // @ts-ignore
    return this.prismaClient.user.create({ data: partial });
  }

  public findOneByEmail(email: string): Promise<UserModel> {
    return this.prismaClient.user.findUnique({ where: { email } });
  }
}
