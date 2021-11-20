import { PrismaClient } from '@prisma/client';

export class PrismaClientConnection {
  private static prisma: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!this.prisma) PrismaClientConnection.prisma = new PrismaClient();

    return PrismaClientConnection.prisma;
  }
}
