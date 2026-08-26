import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  MAX_BASIC_SURVEY_OPTIONS,
  MAX_BASIC_SURVEY_QUESTIONS,
} from '../constants/tour-destination.constant';
import { BasicSurveySkipDto } from './basic-survey-skip.dto';

export class BasicSurveyAnswerDto {
  @ApiProperty({ description: '기초 설문 질문 ID', example: 101, minimum: 1 })
  @IsInt()
  @Min(1)
  questionId: number;

  @ApiProperty({
    description: '선택한 답변 항목 ID 목록',
    example: [1001],
    minItems: 1,
    maxItems: MAX_BASIC_SURVEY_OPTIONS,
    uniqueItems: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(MAX_BASIC_SURVEY_OPTIONS)
  @ArrayUnique()
  @IsInt({ each: true })
  @Min(1, { each: true })
  optionIds: number[];
}

export class BasicSurveySubmitDto extends BasicSurveySkipDto {
  @ApiProperty({
    description: '질문별 답변 목록',
    type: () => [BasicSurveyAnswerDto],
    minItems: 1,
    maxItems: MAX_BASIC_SURVEY_QUESTIONS,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(MAX_BASIC_SURVEY_QUESTIONS)
  @ValidateNested({ each: true })
  @Type(() => BasicSurveyAnswerDto)
  answers: BasicSurveyAnswerDto[];
}
