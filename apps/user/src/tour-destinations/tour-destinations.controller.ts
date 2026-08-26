import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  ApiCommonErrorResponses,
  ApiConflictErrorResponse,
  ApiOkEnvelope,
  ApiPaginatedEnvelope,
} from '../common/decorators/api-response.decorator';
import type { PaginatedResponse } from '../common/pagination/paginated-response.interface';
import { BasicSurveySkipDto } from './dto/basic-survey-skip.dto';
import { BasicSurveySubmitDto } from './dto/basic-survey-submit.dto';
import { TourDestinationEntryQueryDto } from './dto/tour-destination-entry-query.dto';
import { TourDestinationOnboardingParamsDto } from './dto/tour-destination-onboarding-params.dto';
import { TourDestinationOnboardingQueryDto } from './dto/tour-destination-onboarding-query.dto';
import { BasicSurveySubmissionResponseDto } from './models/basic-survey-submission-response.dto';
import { TourDestinationBasicSurveyResponseDto } from './models/tour-destination-basic-survey-response.dto';
import { TourDestinationDetailResponseDto } from './models/tour-destination-detail-response.dto';
import { TourDestinationEntryResponseDto } from './models/tour-destination-entry-response.dto';
import { TourDestinationOnboardingResponseDto } from './models/tour-destination-onboarding-response.dto';
import { TourDestinationBasicSurveySubmissionService } from './tour-destination-basic-survey-submission.service';
import { TourDestinationsService } from './tour-destinations.service';

@ApiTags('Tour Destinations')
@Controller('tour-destinations')
export class TourDestinationsController {
  constructor(
    private readonly tourDestinationsService: TourDestinationsService,
    private readonly basicSurveySubmissionService: TourDestinationBasicSurveySubmissionService,
  ) {}

  @Get('entry')
  @ApiOperation({ summary: '광집사 진입 관광지 목록 조회' })
  @ApiPaginatedEnvelope(TourDestinationEntryResponseDto)
  @ApiCommonErrorResponses()
  findEntryDestinations(
    @Query() query: TourDestinationEntryQueryDto,
  ): Promise<PaginatedResponse<TourDestinationEntryResponseDto>> {
    return this.tourDestinationsService.findEntryDestinations(query);
  }

  @Get(':destinationId')
  @ApiOperation({ summary: '관광지 상세(메타) 조회' })
  @ApiOkEnvelope(TourDestinationDetailResponseDto)
  @ApiCommonErrorResponses()
  findOne(
    @Param() params: TourDestinationOnboardingParamsDto,
    @Query() query: TourDestinationOnboardingQueryDto,
  ): Promise<TourDestinationDetailResponseDto> {
    return this.tourDestinationsService.findOne(params.destinationId, query);
  }

  @Get(':destinationId/onboardings')
  @ApiOperation({ summary: '관광지 온보딩 목록 조회' })
  @ApiOkEnvelope(TourDestinationOnboardingResponseDto)
  @ApiCommonErrorResponses()
  findOnboardings(
    @Param() params: TourDestinationOnboardingParamsDto,
    @Query() query: TourDestinationOnboardingQueryDto,
  ): Promise<TourDestinationOnboardingResponseDto> {
    return this.tourDestinationsService.findOnboardings(params.destinationId, query);
  }

  @Get(':destinationId/onboarding/basic-survey')
  @ApiOperation({ summary: '관광지 기초 설문 조회' })
  @ApiOkEnvelope(TourDestinationBasicSurveyResponseDto)
  @ApiCommonErrorResponses()
  findBasicSurvey(
    @Param() params: TourDestinationOnboardingParamsDto,
    @Query() query: TourDestinationOnboardingQueryDto,
  ): Promise<TourDestinationBasicSurveyResponseDto> {
    return this.tourDestinationsService.findBasicSurvey(params.destinationId, query);
  }

  @Post(':destinationId/onboarding/basic-survey/skip')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '관광지 기초 설문 건너뛰기' })
  @ApiOkEnvelope(BasicSurveySubmissionResponseDto)
  @ApiCommonErrorResponses()
  @ApiConflictErrorResponse()
  skipBasicSurvey(
    @Param() params: TourDestinationOnboardingParamsDto,
    @Body() body: BasicSurveySkipDto,
  ): Promise<BasicSurveySubmissionResponseDto> {
    return this.basicSurveySubmissionService.skip(params.destinationId, body);
  }

  @Post(':destinationId/onboarding/basic-survey/answers')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '관광지 기초 설문 답변 제출' })
  @ApiOkEnvelope(BasicSurveySubmissionResponseDto)
  @ApiCommonErrorResponses()
  @ApiConflictErrorResponse()
  submitBasicSurveyAnswers(
    @Param() params: TourDestinationOnboardingParamsDto,
    @Body() body: BasicSurveySubmitDto,
  ): Promise<BasicSurveySubmissionResponseDto> {
    return this.basicSurveySubmissionService.submitAnswers(params.destinationId, body);
  }
}
