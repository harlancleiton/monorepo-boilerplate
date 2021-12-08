import { PrismaClient } from '@prisma/client';

import { CreateUserTokenInput, UserTokenRepository } from '~/modules/auth/data';
import { UserTokenModel, UserTokenType } from '~/modules/auth/domain';

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
      type: input.type,
      user: input.user
    };
  }

  public async findByToken(token: string): Promise<UserTokenModel | null> {
    const userToken = await this.prismaClient.userToken.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!userToken) return null;

    return {
      ...userToken,
      type: userToken.type as UserTokenType
    };
  }
}
