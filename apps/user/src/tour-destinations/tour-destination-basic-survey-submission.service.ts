import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ERROR_CODE } from '../common/constants/error-code.constant';
import { AppException } from '../common/exceptions/app.exception';
import { nowKST } from '../common/utils/date.util';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '../generated/prisma/client';
import {
  BASIC_SURVEY_SUBMISSION_STATUS,
  MAX_BASIC_SURVEY_OPTIONS,
  MAX_BASIC_SURVEY_QUESTIONS,
  MIN_MULTI_BASIC_SURVEY_OPTIONS,
  type BasicSurveySubmissionStatus,
  type TourDestinationLanguage,
} from './constants/tour-destination.constant';
import { BasicSurveySkipDto } from './dto/basic-survey-skip.dto';
import { BasicSurveyAnswerDto, BasicSurveySubmitDto } from './dto/basic-survey-submit.dto';
import {
  createActiveBasicSurveyOptionWhere,
  createActiveBasicSurveyQuestionWhere,
  createActiveTourDestinationWhere,
} from './helpers/basic-survey-query.helper';
import { BasicSurveySubmissionResponseDto } from './models/basic-survey-submission-response.dto';

const EXISTING_SUBMISSION_SELECT = {
  submissionId: true,
  visitorId: true,
  tourDestinationId: true,
  languageCode: true,
  status: true,
  submittedAt: true,
  skippedAt: true,
  visitorOnboardingBasicSurveyAnswers: {
    select: {
      onboardingBasicSurveyQuestionId: true,
      onboardingBasicSurveyOptionId: true,
    },
  },
} as const satisfies Prisma.OnboardingSurveySubmissionSelect;

type ExistingSubmission = Prisma.OnboardingSurveySubmissionGetPayload<{
  select: typeof EXISTING_SUBMISSION_SELECT;
}>;

type ActiveSurveyQuestion = {
  id: number;
  title: Prisma.JsonValue | null;
  questionType: string | null;
  onboardingBasicSurveyOptions: {
    id: number;
    optionItem: Prisma.JsonValue | null;
  }[];
};

type SubmissionCommand = {
  destinationId: number;
  submissionId: string;
  visitorId: string;
  languageCode: TourDestinationLanguage;
  status: BasicSurveySubmissionStatus;
  answers: BasicSurveyAnswerDto[];
};

@Injectable()
export class TourDestinationBasicSurveySubmissionService {
  private readonly logger = new Logger(TourDestinationBasicSurveySubmissionService.name);

  constructor(private readonly prisma: PrismaService) {}

  skip(destinationId: number, dto: BasicSurveySkipDto): Promise<BasicSurveySubmissionResponseDto> {
    return this.processSubmission({
      destinationId,
      submissionId: dto.submissionId,
      visitorId: dto.visitorId,
      languageCode: dto.languageCode,
      status: BASIC_SURVEY_SUBMISSION_STATUS.SKIPPED,
      answers: [],
    });
  }

  submitAnswers(
    destinationId: number,
    dto: BasicSurveySubmitDto,
  ): Promise<BasicSurveySubmissionResponseDto> {
    return this.processSubmission({
      destinationId,
      submissionId: dto.submissionId,
      visitorId: dto.visitorId,
      languageCode: dto.languageCode,
      status: BASIC_SURVEY_SUBMISSION_STATUS.SUBMITTED,
      answers: dto.answers,
    });
  }

  private async processSubmission(
    command: SubmissionCommand,
  ): Promise<BasicSurveySubmissionResponseDto> {
    const existingSubmission = await this.findExistingSubmission(this.prisma, command.submissionId);
    if (existingSubmission) {
      return this.resolveIdempotentSubmission(existingSubmission, command);
    }

    try {
      return await this.prisma.$transaction(async (transaction) => {
        const concurrentSubmission = await this.findExistingSubmission(
          transaction,
          command.submissionId,
        );
        if (concurrentSubmission) {
          return this.resolveIdempotentSubmission(concurrentSubmission, command);
        }

        const now = nowKST();
        await transaction.analyticsVisitor.upsert({
          where: { visitorId: command.visitorId },
          create: {
            visitorId: command.visitorId,
            createdAt: now,
            firstSeenAt: now,
            lastSeenAt: now,
          },
          update: {
            lastSeenAt: now,
            updatedAt: now,
            updatedBy: 0,
            deletedAt: null,
            deletedBy: null,
            isVisible: true,
            isDeleted: false,
          },
        });

        const destination = await transaction.tourDestination.findFirst({
          where: {
            id: command.destinationId,
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

        if (destination.onboardingBasicSurveyQuestions.length === 0) {
          throw new AppException(
            '현재 제출할 수 있는 기초 설문이 없습니다.',
            ERROR_CODE.CONFLICT,
            HttpStatus.CONFLICT,
          );
        }

        const answerRows =
          command.status === BASIC_SURVEY_SUBMISSION_STATUS.SUBMITTED
            ? this.validateAnswersAndCreateRows(
                destination.onboardingBasicSurveyQuestions,
                command.answers,
                command.submissionId,
                command.destinationId,
                now,
              )
            : [];

        const submittedAt =
          command.status === BASIC_SURVEY_SUBMISSION_STATUS.SUBMITTED ? now : null;
        const skippedAt = command.status === BASIC_SURVEY_SUBMISSION_STATUS.SKIPPED ? now : null;

        const submission = await transaction.onboardingSurveySubmission.create({
          data: {
            submissionId: command.submissionId,
            visitorId: command.visitorId,
            tourDestinationId: command.destinationId,
            languageCode: command.languageCode,
            status: command.status,
            createdAt: now,
            submittedAt,
            skippedAt,
          },
          select: EXISTING_SUBMISSION_SELECT,
        });

        if (answerRows.length > 0) {
          await transaction.visitorOnboardingBasicSurveyAnswer.createMany({
            data: answerRows,
          });
        }

        await transaction.analyticsVisitorSurveyStatus.upsert({
          where: {
            visitorId_tourDestinationId: {
              visitorId: command.visitorId,
              tourDestinationId: command.destinationId,
            },
          },
          create: {
            visitorId: command.visitorId,
            tourDestinationId: command.destinationId,
            submissionId: command.submissionId,
            status: command.status,
            createdAt: now,
            firstSeenAt: now,
            submittedAt,
            skippedAt,
            createdBy: 0,
          },
          update: {
            submissionId: command.submissionId,
            status: command.status,
            submittedAt,
            skippedAt,
            updatedAt: now,
            updatedBy: 0,
            deletedAt: null,
            deletedBy: null,
            isVisible: true,
            isDeleted: false,
          },
        });

        return this.toResponse(submission, command.languageCode);
      });
    } catch (error) {
      if (this.isUniqueConstraintError(error)) {
        const concurrentSubmission = await this.findExistingSubmission(
          this.prisma,
          command.submissionId,
        );
        if (concurrentSubmission) {
          return this.resolveIdempotentSubmission(concurrentSubmission, command);
        }
      }

      throw error;
    }
  }

  private validateAnswersAndCreateRows(
    questions: ActiveSurveyQuestion[],
    answers: BasicSurveyAnswerDto[],
    submissionId: string,
    destinationId: number,
    createdAt: Date,
  ): Prisma.VisitorOnboardingBasicSurveyAnswerCreateManyInput[] {
    const answerByQuestionId = new Map<number, BasicSurveyAnswerDto>();
    for (const answer of answers) {
      if (answerByQuestionId.has(answer.questionId)) {
        this.throwBadRequest('같은 질문에 대한 답변을 중복 제출할 수 없습니다.');
      }
      answerByQuestionId.set(answer.questionId, answer);
    }

    if (
      answerByQuestionId.size !== questions.length ||
      questions.some((question) => !answerByQuestionId.has(question.id))
    ) {
      this.throwBadRequest('노출된 모든 기초 설문 질문에 답변해야 합니다.');
    }

    const rows: Prisma.VisitorOnboardingBasicSurveyAnswerCreateManyInput[] = [];
    const emptySnapshotFields = new Set<string>();

    for (const question of questions) {
      const answer = answerByQuestionId.get(question.id);
      if (!answer) {
        this.throwBadRequest('노출된 모든 기초 설문 질문에 답변해야 합니다.');
      }

      const uniqueOptionIds = new Set(answer.optionIds);
      if (uniqueOptionIds.size !== answer.optionIds.length) {
        this.throwBadRequest('같은 선택지를 중복 제출할 수 없습니다.');
      }

      this.validateOptionCount(question.questionType, answer.optionIds.length);

      const optionById = new Map(
        question.onboardingBasicSurveyOptions.map((option) => [option.id, option]),
      );
      for (const optionId of answer.optionIds) {
        const option = optionById.get(optionId);
        if (!option) {
          this.throwBadRequest(
            '질문에 속하지 않거나 선택할 수 없는 답변 항목이 포함되어 있습니다.',
          );
        }

        rows.push({
          submissionId,
          createdAt,
          onboardingBasicSurveyQuestionId: question.id,
          onboardingBasicSurveyOptionId: option.id,
          questionSnapshot: this.toSnapshot(
            question.title,
            `question:${question.id}`,
            emptySnapshotFields,
          ),
          optionSnapshot: this.toSnapshot(
            option.optionItem,
            `option:${option.id}`,
            emptySnapshotFields,
          ),
        });
      }
    }

    if (emptySnapshotFields.size > 0) {
      this.logger.warn(
        `기초 설문 제출 snapshot 원본이 null입니다. destinationId=${destinationId}, fields=${[...emptySnapshotFields].join(',')}`,
      );
    }

    return rows;
  }

  private validateOptionCount(questionType: string | null, optionCount: number): void {
    if (questionType === 'SINGLE' && optionCount === 1) return;
    if (
      questionType === 'MULTI' &&
      optionCount >= MIN_MULTI_BASIC_SURVEY_OPTIONS &&
      optionCount <= MAX_BASIC_SURVEY_OPTIONS
    ) {
      return;
    }

    const message =
      questionType === 'SINGLE'
        ? '단일 선택 질문은 답변 항목을 정확히 1개 선택해야 합니다.'
        : questionType === 'MULTI'
          ? `다중 선택 질문은 답변 항목을 ${MIN_MULTI_BASIC_SURVEY_OPTIONS}개 이상 ${MAX_BASIC_SURVEY_OPTIONS}개 이하로 선택해야 합니다.`
          : '지원하지 않는 기초 설문 질문 유형입니다.';
    this.throwBadRequest(message);
  }

  private toSnapshot(
    value: Prisma.JsonValue | null,
    field: string,
    emptySnapshotFields: Set<string>,
  ): Prisma.InputJsonValue {
    if (value === null) {
      emptySnapshotFields.add(field);
      return {};
    }

    return value;
  }

  private async findExistingSubmission(
    client: Pick<Prisma.TransactionClient, 'onboardingSurveySubmission'>,
    submissionId: string,
  ): Promise<ExistingSubmission | null> {
    return client.onboardingSurveySubmission.findUnique({
      where: { submissionId },
      select: EXISTING_SUBMISSION_SELECT,
    });
  }

  private resolveIdempotentSubmission(
    submission: ExistingSubmission,
    command: SubmissionCommand,
  ): BasicSurveySubmissionResponseDto {
    const baseFieldsMatch =
      submission.visitorId === command.visitorId &&
      submission.tourDestinationId === command.destinationId &&
      submission.languageCode === command.languageCode &&
      submission.status === command.status;

    const existingAnswers = submission.visitorOnboardingBasicSurveyAnswers.map((answer) => ({
      questionId: answer.onboardingBasicSurveyQuestionId,
      optionId: answer.onboardingBasicSurveyOptionId,
    }));
    const requestedAnswers = command.answers.flatMap((answer) =>
      answer.optionIds.map((optionId) => ({ questionId: answer.questionId, optionId })),
    );

    if (
      !baseFieldsMatch ||
      this.canonicalizeAnswers(existingAnswers) !== this.canonicalizeAnswers(requestedAnswers)
    ) {
      throw new AppException(
        '같은 submissionId를 다른 요청에 사용할 수 없습니다.',
        ERROR_CODE.CONFLICT,
        HttpStatus.CONFLICT,
      );
    }

    return this.toResponse(submission, command.languageCode);
  }

  private canonicalizeAnswers(answers: { questionId: number; optionId: number }[]): string {
    return JSON.stringify(
      [...answers].sort(
        (left, right) => left.questionId - right.questionId || left.optionId - right.optionId,
      ),
    );
  }

  private toResponse(
    submission: ExistingSubmission,
    languageCode: TourDestinationLanguage,
  ): BasicSurveySubmissionResponseDto {
    return {
      submissionId: submission.submissionId,
      visitorId: submission.visitorId,
      destinationId: submission.tourDestinationId,
      languageCode,
      status: submission.status,
      submittedAt: submission.submittedAt,
      skippedAt: submission.skippedAt,
    };
  }

  private isUniqueConstraintError(error: unknown): boolean {
    return error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002';
  }

  private throwBadRequest(message: string): never {
    throw new AppException(message, ERROR_CODE.BAD_REQUEST, HttpStatus.BAD_REQUEST);
  }
}
