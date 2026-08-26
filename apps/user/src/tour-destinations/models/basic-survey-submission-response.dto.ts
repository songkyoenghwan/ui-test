import { ApiProperty } from '@nestjs/swagger';
import {
  BASIC_SURVEY_SUBMISSION_STATUS,
  TOUR_DESTINATION_LANGUAGES,
  type BasicSurveySubmissionStatus,
  type TourDestinationLanguage,
} from '../constants/tour-destination.constant';

export class BasicSurveySubmissionResponseDto {
  @ApiProperty({
    example: 'e29053d2-c7af-4eba-8765-b23d9d060072',
    format: 'uuid',
  })
  submissionId: string;

  @ApiProperty({
    example: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
    format: 'uuid',
  })
  visitorId: string;

  @ApiProperty({ example: 38 })
  destinationId: number;

  @ApiProperty({ enum: TOUR_DESTINATION_LANGUAGES, example: 'ko' })
  languageCode: TourDestinationLanguage;

  @ApiProperty({ enum: Object.values(BASIC_SURVEY_SUBMISSION_STATUS), example: 'SUBMITTED' })
  status: BasicSurveySubmissionStatus;

  @ApiProperty({ example: '2026-08-20T12:00:00.000Z', format: 'date-time', nullable: true })
  submittedAt: Date | null;

  @ApiProperty({ example: null, format: 'date-time', nullable: true })
  skippedAt: Date | null;
}
