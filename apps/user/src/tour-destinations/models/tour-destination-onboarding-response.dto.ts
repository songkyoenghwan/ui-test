import { ApiProperty } from '@nestjs/swagger';

export class TourDestinationOnboardingItemResponseDto {
  @ApiProperty({ example: 10 })
  id: number;

  @ApiProperty({ example: '수원시장에 오신 걸 환영합니다.' })
  title: string;

  @ApiProperty({ example: '온보딩 설명' })
  description: string;

  @ApiProperty({
    example: 'https://cdn.example.com/onboarding/main.png',
    nullable: true,
  })
  mainImageUrl: string | null;

  @ApiProperty({
    example: null,
    nullable: true,
  })
  subImageUrl: string | null;
}

export class TourDestinationOnboardingResponseDto {
  @ApiProperty({ example: 30 })
  destinationId: number;

  @ApiProperty({ example: true })
  hasBasicSurvey: boolean;

  @ApiProperty({ type: () => [TourDestinationOnboardingItemResponseDto] })
  items: TourDestinationOnboardingItemResponseDto[];
}
