import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Prisma, PrismaClient } from '../generated/prisma/client';

const DEVELOPMENT_LOG = [
  { emit: 'event', level: 'query' },
  { emit: 'stdout', level: 'info' },
  { emit: 'stdout', level: 'warn' },
  { emit: 'stdout', level: 'error' },
] satisfies Prisma.LogDefinition[];

const PRODUCTION_LOG = [{ emit: 'stdout', level: 'error' }] satisfies Prisma.LogDefinition[];

type PrismaServiceOptions = {
  adapter: PrismaPg;
  log: typeof DEVELOPMENT_LOG | typeof PRODUCTION_LOG;
};

@Injectable()
export class PrismaService
  extends PrismaClient<PrismaServiceOptions>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor(configService: ConfigService) {
    const connectionString = configService.getOrThrow<string>('DATABASE_URL');
    const isDevelopment = configService.get<string>('app.nodeEnv', 'development') === 'development';
    const adapter = new PrismaPg({
      connectionString,
      max: configService.get<number>('app.database.poolMax', 10),
      connectionTimeoutMillis: configService.get<number>('app.database.connectionTimeoutMs', 5_000),
      idleTimeoutMillis: configService.get<number>('app.database.idleTimeoutMs', 30_000),
    });
    super({ adapter, log: isDevelopment ? DEVELOPMENT_LOG : PRODUCTION_LOG });

    if (isDevelopment) {
      this.$on('query', (event) => {
        this.logger.debug(`\n[Query]    ${event.query}`);
        this.logger.debug(`[Params]   ${event.params}`);
        this.logger.debug(`[Duration] ${event.duration}ms`);
      });
    }
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
