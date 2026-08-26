import { ApiProperty } from '@nestjs/swagger';
import {
  BASIC_SURVEY_QUESTION_TYPES,
  type BasicSurveyQuestionType,
} from '../constants/tour-destination.constant';

export class TourDestinationBasicSurveyOptionResponseDto {
  @ApiProperty({ example: 166 })
  id: number;

  @ApiProperty({ example: '현지에 살아요' })
  label: string;
}

export class TourDestinationBasicSurveyQuestionResponseDto {
  @ApiProperty({ example: 36 })
  id: number;

  @ApiProperty({ enum: BASIC_SURVEY_QUESTION_TYPES, example: 'SINGLE' })
  questionType: BasicSurveyQuestionType;

  @ApiProperty({ example: false })
  aiRecommendationEnabled: boolean;

  @ApiProperty({ example: '어디에 사시나요?' })
  title: string;

  @ApiProperty({ type: () => [TourDestinationBasicSurveyOptionResponseDto] })
  options: TourDestinationBasicSurveyOptionResponseDto[];
}

export class TourDestinationBasicSurveyResponseDto {
  @ApiProperty({ example: 38 })
  destinationId: number;

  @ApiProperty({ example: 4 })
  questionCount: number;

  @ApiProperty({ type: () => [TourDestinationBasicSurveyQuestionResponseDto] })
  questions: TourDestinationBasicSurveyQuestionResponseDto[];
}
