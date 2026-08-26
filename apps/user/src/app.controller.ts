import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('기본')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: '서버 상태 확인' })
  @ApiOkResponse({
    description: '서버가 정상적으로 응답합니다.',
    schema: {
      required: ['success', 'data'],
      properties: {
        success: { type: 'boolean', example: true },
        data: { type: 'string', example: 'Hello World!' },
      },
    },
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
