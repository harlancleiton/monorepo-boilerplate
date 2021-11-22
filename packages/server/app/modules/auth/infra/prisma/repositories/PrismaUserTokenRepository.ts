import { PrismaClient } from '@prisma/client';

import { CreateUserTokenInput, UserTokenRepository } from '~/modules/auth/data';
import { UserTokenType } from '~/modules/auth/domain';
import { UserTokenModel } from '~/modules/auth/domain/models/UserToken';

export class PrismaUserTokenRepository implements UserTokenRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  public async create(input: CreateUserTokenInput): Promise<UserTokenModel> {
    const userToken = await this.prismaClient.userToken.create({
      data: {
        type: input.type,
        userId: input.user.id
      }
    });

    return {
      ...userToken,
      type: UserTokenType[userToken.type],
      user: input.user
    };
  }
}
