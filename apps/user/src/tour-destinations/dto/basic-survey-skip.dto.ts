import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsUUID } from 'class-validator';
import {
  TOUR_DESTINATION_LANGUAGES,
  type TourDestinationLanguage,
} from '../constants/tour-destination.constant';

export class BasicSurveySkipDto {
  @ApiProperty({
    description: '클라이언트가 요청마다 생성하는 멱등성 식별자',
    example: 'e29053d2-c7af-4eba-8765-b23d9d060072',
    format: 'uuid',
  })
  @IsUUID('4')
  submissionId: string;

  @ApiProperty({
    description: '브라우저 localStorage에 저장된 익명 방문자 식별자',
    example: '7074e8be-1c93-41c0-8e4f-a2569f780cbc',
    format: 'uuid',
  })
  @IsUUID('4')
  visitorId: string;

  @ApiProperty({
    description: '설문을 본 언어',
    enum: TOUR_DESTINATION_LANGUAGES,
    example: 'ko',
  })
  @IsIn(TOUR_DESTINATION_LANGUAGES)
  languageCode: TourDestinationLanguage;
}
