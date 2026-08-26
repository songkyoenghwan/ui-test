import { ApiProperty } from '@nestjs/swagger';
import { CongestionStatus } from '../../generated/prisma/enums';
import { POI_CONGESTION_LEVELS } from '../constants/poi.constant';

export class PoiDetailFileResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'https://cdn.example.com/facilities/main.png' })
  fileUrl!: string;
}

export class PoiDetailBreakScheduleResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '12:00', nullable: true })
  breakStartTime!: string | null;

  @ApiProperty({ example: '13:00', nullable: true })
  breakEndTime!: string | null;
}

export class PoiDetailOperatingScheduleResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 1, nullable: true })
  dayOfWeek!: number | null;

  @ApiProperty({ example: '09:00', nullable: true })
  openingTime!: string | null;

  @ApiProperty({ example: '18:00', nullable: true })
  closingTime!: string | null;

  @ApiProperty({ type: [PoiDetailBreakScheduleResponseDto] })
  facilityBreakSchedules!: PoiDetailBreakScheduleResponseDto[];
}

export class PoiDetailHolidayScheduleResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 1, nullable: true })
  holidayType!: number | null;

  @ApiProperty({ example: 1, nullable: true })
  weekOfMonth!: number | null;

  @ApiProperty({ example: 0, nullable: true })
  dayOfWeek!: number | null;

  @ApiProperty({ example: null, nullable: true })
  fixedHoliday!: number | null;
}

export class PoiDetailButtonResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '홈페이지' },
  })
  buttonName!: unknown;

  @ApiProperty({ example: 'https://example.com', nullable: true })
  buttonUrl!: string | null;

  @ApiProperty({ example: 3, nullable: true })
  tourDestinationCommonButtonId!: number | null;
}

export class PoiDetailProductResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    example: { ko: '입장권' },
  })
  name!: unknown;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '성인 1매' },
  })
  description!: unknown;

  @ApiProperty({ example: 10000, nullable: true })
  price!: number | null;

  @ApiProperty({ example: 'KRW', nullable: true })
  currency!: string | null;

  @ApiProperty({ type: [PoiDetailFileResponseDto] })
  facilityProductFiles!: PoiDetailFileResponseDto[];
}

export class PoiDetailVpsPopupResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({
    type: 'object',
    additionalProperties: true,
    example: { ko: 'AR 안내' },
  })
  name!: unknown;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '카메라를 비추세요' },
  })
  description!: unknown;

  @ApiProperty({ example: 'https://example.com/vps' })
  url!: string;

  @ApiProperty({ example: 'https://cdn.example.com/vps.png', nullable: true })
  fileUrl!: string | null;

  @ApiProperty({ example: 10, nullable: true })
  poiId!: number | null;

  @ApiProperty({ example: true, nullable: true })
  isVisible!: boolean | null;
}

export class PoiDetailCategoryParentResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '편의시설' },
  })
  name!: unknown;
}

export class PoiDetailCategoryColorResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: '#3B82F6', nullable: true })
  colorCode!: string | null;
}

export class PoiDetailCategoryResponseDto {
  @ApiProperty({ example: 2 })
  id!: number;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '화장실' },
  })
  name!: unknown;

  @ApiProperty({ example: 'restroom', nullable: true })
  iconKey!: string | null;

  @ApiProperty({ type: PoiDetailCategoryColorResponseDto, nullable: true })
  categoryColorCodes!: PoiDetailCategoryColorResponseDto | null;

  @ApiProperty({ type: PoiDetailCategoryParentResponseDto, nullable: true })
  parent!: PoiDetailCategoryParentResponseDto | null;
}

export class PoiDetailFacilityResponseDto {
  @ApiProperty({ example: 11 })
  id!: number;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '정문 안내소' },
  })
  name!: unknown;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '안내 및 티켓 판매' },
  })
  description!: unknown;

  @ApiProperty({ example: '02-1234-5678', nullable: true })
  contact!: string | null;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', nullable: true })
  startAt!: Date | null;

  @ApiProperty({ example: '2026-12-31T00:00:00.000Z', nullable: true })
  endAt!: Date | null;

  @ApiProperty({ type: PoiDetailCategoryResponseDto, nullable: true })
  category!: PoiDetailCategoryResponseDto | null;

  @ApiProperty({ type: [PoiDetailFileResponseDto] })
  facilityFiles!: PoiDetailFileResponseDto[];

  @ApiProperty({ type: [PoiDetailOperatingScheduleResponseDto] })
  facilityOperatingSchedules!: PoiDetailOperatingScheduleResponseDto[];

  @ApiProperty({ type: [PoiDetailHolidayScheduleResponseDto] })
  facilityHolidaySchedules!: PoiDetailHolidayScheduleResponseDto[];

  @ApiProperty({ type: [PoiDetailButtonResponseDto] })
  facilityButtons!: PoiDetailButtonResponseDto[];

  @ApiProperty({ type: [PoiDetailFileResponseDto] })
  facilityProductGuideFiles!: PoiDetailFileResponseDto[];

  @ApiProperty({ type: [PoiDetailProductResponseDto] })
  facilityProducts!: PoiDetailProductResponseDto[];

  @ApiProperty({ type: [PoiDetailVpsPopupResponseDto] })
  facilityVpsPopups!: PoiDetailVpsPopupResponseDto[];

  @ApiProperty({
    enum: POI_CONGESTION_LEVELS,
    example: CongestionStatus.NORMAL,
  })
  congestionStatus!: (typeof POI_CONGESTION_LEVELS)[number];

  @ApiProperty({ example: true })
  isUsingCongestion!: boolean;

  @ApiProperty({ example: false })
  hasVpsPopup!: boolean;
}

export class PoiDetailMappingResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 11, nullable: true })
  facilityId!: number | null;

  @ApiProperty({ example: 1, nullable: true })
  sortingNumber!: number | null;

  @ApiProperty({ type: PoiDetailFacilityResponseDto, nullable: true })
  facility!: PoiDetailFacilityResponseDto | null;
}

export class PoiDetailResponseDto {
  @ApiProperty({ example: 5 })
  id!: number;

  @ApiProperty({ example: 3, nullable: true })
  tourDestinationId!: number | null;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '서울광장' },
  })
  name!: unknown;

  @ApiProperty({ example: 37.5665 })
  latitude!: number;

  @ApiProperty({ example: 126.978 })
  longitude!: number;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '서울특별시 중구' },
  })
  address!: unknown;

  @ApiProperty({
    type: 'object',
    nullable: true,
    additionalProperties: true,
    example: { ko: '시청 앞' },
  })
  addressDetail!: unknown;

  @ApiProperty({ example: 'POI-005', nullable: true })
  managementCode!: string | null;

  @ApiProperty({ type: [PoiDetailMappingResponseDto] })
  facilityPoiMappings!: PoiDetailMappingResponseDto[];
}
