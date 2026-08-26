import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';
import { SkipResponseEnvelope } from '../common/decorators/skip-response-envelope.decorator';
import { PrismaService } from '../database/prisma.service';

@ApiTags('상태 확인')
@SkipThrottle()
@SkipResponseEnvelope()
@Controller({ path: 'health', version: VERSION_NEUTRAL })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly database: PrismaHealthIndicator,
    private readonly prisma: PrismaService,
  ) {}

  @Get('live')
  @HealthCheck()
  @ApiOperation({ summary: '애플리케이션 생존 상태 확인' })
  checkLiveness() {
    return this.health.check([]);
  }

  @Get('ready')
  @HealthCheck()
  @ApiOperation({ summary: '데이터베이스 포함 준비 상태 확인' })
  checkReadiness() {
    return this.health.check([
      () => this.database.pingCheck('database', this.prisma, { timeout: 1000 }),
    ]);
  }
}
