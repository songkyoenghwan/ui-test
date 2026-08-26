import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ERROR_CODE } from '../common/constants/error-code.constant';
import { AppException } from '../common/exceptions/app.exception';
import { createPaginatedResponse } from '../common/pagination/create-paginated-response';
import type { PaginatedResponse } from '../common/pagination/paginated-response.interface';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '../generated/prisma/client';
import {
  ACTIVE_ONBOARDING_DEPLOYMENT_STATUS,
  BASIC_SURVEY_QUESTION_TYPES,
  DEFAULT_ENTRY_THUMBNAIL_URL,
  MAX_BASIC_SURVEY_OPTIONS,
  MAX_BASIC_SURVEY_QUESTIONS,
  MAX_ONBOARDING_ITEMS,
  ONBOARDING_FILE_TYPE,
  TOUR_DESTINATION_LANGUAGES,
  type BasicSurveyQuestionType,
  type TourDestinationLanguage,
} from './constants/tour-destination.constant';
import { TourDestinationEntryQueryDto } from './dto/tour-destination-entry-query.dto';
import { TourDestinationOnboardingQueryDto } from './dto/tour-destination-onboarding-query.dto';
import {
  createActiveBasicSurveyOptionWhere,
  createActiveBasicSurveyQuestionWhere,
  createActiveTourDestinationWhere,
} from './helpers/basic-survey-query.helper';
import {
  TourDestinationBasicSurveyQuestionResponseDto,
  TourDestinationBasicSurveyResponseDto,
} from './models/tour-destination-basic-survey-response.dto';
import { TourDestinationDetailResponseDto } from './models/tour-destination-detail-response.dto';
import { TourDestinationEntryResponseDto } from './models/tour-destination-entry-response.dto';
import { TourDestinationOnboardingResponseDto } from './models/tour-destination-onboarding-response.dto';

@Injectable()
export class TourDestinationsService {
  private readonly logger = new Logger(TourDestinationsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async findEntryDestinations(
    query: TourDestinationEntryQueryDto,
  ): Promise<PaginatedResponse<TourDestinationEntryResponseDto>> {
    const { page, pageSize, language } = query;
    const now = new Date();
    const where = createActiveTourDestinationWhere(now);

    const [destinations, totalCount] = await this.prisma.$transaction([
      this.prisma.tourDestination.findMany({
        where,
        orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: {
          id: true,
          name: true,
          fileUrl: true,
          supportedLanguages: true,
          onboardings: {
            where: {
              isVisible: true,
              isDeleted: false,
              deploymentStatus: ACTIVE_ONBOARDING_DEPLOYMENT_STATUS,
            },
            select: { id: true },
            take: 1,
          },
          onboardingBasicSurveyQuestions: {
            where: createActiveBasicSurveyQuestionWhere(now),
            select: { id: true },
            take: 1,
          },
        },
      }),
      this.prisma.tourDestination.count({ where }),
    ]);

    const items = destinations.map((destination) => ({
      id: destination.id,
      name: this.getLocalizedText(destination.name, language),
      // TODO: 기존 대상지의 대표이미지 데이터 이관 완료 후 fallback 제거를 검토한다.
      thumbnailUrl: destination.fileUrl ?? DEFAULT_ENTRY_THUMBNAIL_URL,
      hasOnboarding: destination.onboardings.length > 0,
      hasBasicSurvey: destination.onboardingBasicSurveyQuestions.length > 0,
      supportedLanguages: this.getSupportedLanguages(destination.supportedLanguages),
    }));

    return createPaginatedResponse(items, totalCount, page, pageSize);
  }

  async findOne(
    destinationId: number,
    query: TourDestinationOnboardingQueryDto,
  ): Promise<TourDestinationDetailResponseDto> {
    const now = new Date();
    const destination = await this.prisma.tourDestination.findFirst({
      where: {
        id: destinationId,
        ...createActiveTourDestinationWhere(now),
      },
      select: {
        id: true,
        name: true,
        latitude: true,
        longitude: true,
        colorCode: true,
        startAt: true,
        endAt: true,
        isAlways: true,
        homepageUrl: true,
        mapUrl: true,
        fileUrl: true,
        supportedLanguages: true,
        isAiRecommendYn: true,
        isFacilityCongestionYn: true,
        isSectionCongestionYn: true,
        isFacilityAddressYn: true,
        isCustomSortingYn: true,
        isVpsContentsYn: true,
      },
    });

    if (!destination) {
      throw new AppException(
        '대상지를 찾을 수 없습니다.',
        ERROR_CODE.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      id: destination.id,
      name: this.getLocalizedText(destination.name, query.language),
      latitude: destination.latitude,
      longitude: destination.longitude,
      colorCode: destination.colorCode,
      startAt: destination.startAt,
      endAt: destination.endAt,
      isAlways: destination.isAlways === true,
      homepageUrl: destination.homepageUrl,
      mapUrl: destination.mapUrl,
      fileUrl: destination.fileUrl,
      supportedLanguages: this.getSupportedLanguages(destination.supportedLanguages),
      isAiRecommendYn: destination.isAiRecommendYn === true,
      isFacilityCongestionYn: destination.isFacilityCongestionYn === true,
      isSectionCongestionYn: destination.isSectionCongestionYn === true,
      isFacilityAddressYn: destination.isFacilityAddressYn === true,
      isCustomSortingYn: destination.isCustomSortingYn === true,
      isVpsContentsYn: destination.isVpsContentsYn === true,
    };
  }

  async findOnboardings(
    destinationId: number,
    query: TourDestinationOnboardingQueryDto,
  ): Promise<TourDestinationOnboardingResponseDto> {
    const now = new Date();
    const destination = await this.prisma.tourDestination.findFirst({
      where: {
        id: destinationId,
        ...createActiveTourDestinationWhere(now),
      },
      select: {
        id: true,
        onboardings: {
          where: {
            isVisible: true,
            isDeleted: false,
            deploymentStatus: ACTIVE_ONBOARDING_DEPLOYMENT_STATUS,
          },
          orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
          take: MAX_ONBOARDING_ITEMS,
          select: {
            id: true,
            title: true,
            description: true,
            onboardingFiles: {
              where: {
                isVisible: true,
                isDeleted: false,
              },
              orderBy: { id: 'desc' },
              select: {
                id: true,
                fileType: true,
                fileUrl: true,
              },
            },
          },
        },
        onboardingBasicSurveyQuestions: {
          where: createActiveBasicSurveyQuestionWhere(now),
          select: { id: true },
          take: 1,
        },
      },
    });

    if (!destination) {
      throw new AppException(
        '대상지를 찾을 수 없습니다.',
        ERROR_CODE.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      destinationId: destination.id,
      hasBasicSurvey: destination.onboardingBasicSurveyQuestions.length > 0,
      items: destination.onboardings.map((onboarding) => ({
        id: onboarding.id,
        title: this.getLocalizedText(onboarding.title, query.language),
        description: this.getLocalizedText(onboarding.description, query.language),
        mainImageUrl: this.getOnboardingImageUrl(
          onboarding.onboardingFiles,
          query.language,
          'main',
        ),
        subImageUrl: this.getOnboardingImageUrl(onboarding.onboardingFiles, query.language, 'sub'),
      })),
    };
  }

  async findBasicSurvey(
    destinationId: number,
    query: TourDestinationOnboardingQueryDto,
  ): Promise<TourDestinationBasicSurveyResponseDto> {
    const now = new Date();
    const destination = await this.prisma.tourDestination.findFirst({
      where: {
        id: destinationId,
        ...createActiveTourDestinationWhere(now),
      },
      select: {
        id: true,
        onboardingBasicSurveyQuestions: {
          where: createActiveBasicSurveyQuestionWhere(now),
          orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
          take: MAX_BASIC_SURVEY_QUESTIONS,
          select: {
            id: true,
            title: true,
            questionType: true,
            isAiRecommendationEnabled: true,
            onboardingBasicSurveyOptions: {
              where: createActiveBasicSurveyOptionWhere(),
              orderBy: [{ sortingNumber: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }],
              take: MAX_BASIC_SURVEY_OPTIONS,
              select: {
                id: true,
                optionItem: true,
              },
            },
          },
        },
      },
    });

    if (!destination) {
      throw new AppException(
        '대상지를 찾을 수 없습니다.',
        ERROR_CODE.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const dataQualityIssues: string[] = [];
    const questions: TourDestinationBasicSurveyQuestionResponseDto[] = [];

    for (const question of destination.onboardingBasicSurveyQuestions) {
      if (!this.isBasicSurveyQuestionType(question.questionType)) {
        dataQualityIssues.push(`question:${question.id}:questionType`);
        continue;
      }

      const title = this.getLocalizedText(question.title, query.language);
      if (!title) dataQualityIssues.push(`question:${question.id}:title`);

      const options = question.onboardingBasicSurveyOptions.map((option) => {
        const label = this.getLocalizedText(option.optionItem, query.language);
        if (!label) dataQualityIssues.push(`option:${option.id}:label`);

        return {
          id: option.id,
          label,
        };
      });

      questions.push({
        id: question.id,
        questionType: question.questionType,
        aiRecommendationEnabled: question.isAiRecommendationEnabled === true,
        title,
        options,
      });
    }

    if (dataQualityIssues.length > 0) {
      this.logger.warn(
        `기초 설문 데이터에 비어 있거나 허용되지 않은 값이 있습니다. destinationId=${destination.id}, fields=${dataQualityIssues.join(',')}`,
      );
    }

    return {
      destinationId: destination.id,
      questionCount: questions.length,
      questions,
    };
  }

  private isBasicSurveyQuestionType(value: string | null): value is BasicSurveyQuestionType {
    return BASIC_SURVEY_QUESTION_TYPES.some((questionType) => questionType === value);
  }

  private getLocalizedText(
    value: Prisma.JsonValue | null,
    language: TourDestinationLanguage,
  ): string {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return '';
    }

    const translations = value;
    const candidates = [
      translations[language],
      translations.ko,
      ...TOUR_DESTINATION_LANGUAGES.map((fallbackLanguage) => translations[fallbackLanguage]),
    ];
    const localizedText = candidates.find(
      (candidate): candidate is string =>
        typeof candidate === 'string' && candidate.trim().length > 0,
    );

    return localizedText ?? '';
  }

  private getOnboardingImageUrl(
    files: { fileType: string; fileUrl: string }[],
    language: TourDestinationLanguage,
    imageType: 'main' | 'sub',
  ): string | null {
    const isKorean = language === 'ko';
    let fileTypes: string[];

    if (imageType === 'main') {
      fileTypes = isKorean
        ? [ONBOARDING_FILE_TYPE.MAIN, ONBOARDING_FILE_TYPE.MAIN_GLOBAL]
        : [ONBOARDING_FILE_TYPE.MAIN_GLOBAL, ONBOARDING_FILE_TYPE.MAIN];
    } else {
      fileTypes = isKorean
        ? [ONBOARDING_FILE_TYPE.THUMBNAIL, ONBOARDING_FILE_TYPE.THUMBNAIL_GLOBAL]
        : [ONBOARDING_FILE_TYPE.THUMBNAIL_GLOBAL, ONBOARDING_FILE_TYPE.THUMBNAIL];
    }

    for (const fileType of fileTypes) {
      const file = files.find(
        (candidate) => candidate.fileType === fileType && candidate.fileUrl.trim().length > 0,
      );
      if (file) return this.resolvePublicFileUrl(file.fileUrl);
    }

    return null;
  }

  private resolvePublicFileUrl(fileUrl: string): string | null {
    const normalizedFileUrl = fileUrl.trim();
    if (!normalizedFileUrl) return null;
    if (/^https?:\/\//i.test(normalizedFileUrl)) return normalizedFileUrl;

    let publicBaseUrl = this.configService.getOrThrow<string>('app.awsS3PublicBaseUrl');
    while (publicBaseUrl.endsWith('/')) {
      publicBaseUrl = publicBaseUrl.slice(0, -1);
    }
    const relativePath = normalizedFileUrl.replace(/^\/+/, '');

    return `${publicBaseUrl}/${relativePath}`;
  }

  private getSupportedLanguages(
    supportedLanguages: Prisma.JsonValue | null,
  ): TourDestinationLanguage[] {
    if (
      !supportedLanguages ||
      typeof supportedLanguages !== 'object' ||
      Array.isArray(supportedLanguages)
    ) {
      return [];
    }

    const languageSettings = supportedLanguages;

    return TOUR_DESTINATION_LANGUAGES.filter((language) => languageSettings[language] === true);
  }
}
