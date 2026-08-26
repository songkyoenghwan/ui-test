import { HttpStatus, Injectable } from '@nestjs/common';
import { ERROR_CODE } from '../common/constants/error-code.constant';
import { AppException } from '../common/exceptions/app.exception';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '../generated/prisma/client';
import {
  POI_MARKER_MAX_ITEMS,
  PUBLIC_VISIBILITY,
  type PoiLanguage,
} from './constants/poi.constant';
import { PoiDetailResponseDto } from './dto/poi-detail-response.dto';
import { PoiViewportQueryDto } from './dto/poi-viewport-query.dto';
import { PoiViewportListResponseDto } from './models/poi-viewport-list-response.dto';
import { POI_DETAIL_SELECT, toPoiDetailResponse } from './poi-detail.util';
import { POI_MARKER_SELECT, toPoiViewportItem, type MarkerPoi } from './poi-marker.util';
import { buildMarkerMappingWhere, normalizeSearchKeyword } from './poi-search.util';

@Injectable()
export class PoisService {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(query: PoiViewportQueryDto): Promise<PoiViewportListResponseDto> {
    const { tourDestinationId, language } = query;
    const keyword = normalizeSearchKeyword(query.keyword);

    return this.findMarkerItems({
      tourDestinationId,
      language,
      mappingWhere: buildMarkerMappingWhere({
        keyword,
        language,
      }),
    });
  }

  async findManyByFacilityIds(input: {
    tourDestinationId: number;
    facilityIds: number[];
    language: PoiLanguage;
  }): Promise<PoiViewportListResponseDto> {
    if (input.facilityIds.length === 0) {
      return { items: [] };
    }

    return this.findMarkerItems({
      tourDestinationId: input.tourDestinationId,
      language: input.language,
      mappingWhere: {
        ...PUBLIC_VISIBILITY,
        facilityId: { in: input.facilityIds },
        facilities: {
          is: {
            ...PUBLIC_VISIBILITY,
            categories: { is: { ...PUBLIC_VISIBILITY } },
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<PoiDetailResponseDto> {
    const now = new Date();
    const poi = await this.prisma.poi.findFirst({
      where: {
        id,
        isDeleted: false,
        isVisible: true,
      },
      select: POI_DETAIL_SELECT,
    });

    if (!poi) {
      throw new AppException('POI를 찾을 수 없습니다.', ERROR_CODE.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return toPoiDetailResponse(poi, now);
  }

  private async findMarkerItems(input: {
    tourDestinationId: number;
    language: PoiLanguage;
    mappingWhere: Prisma.FacilityPoiMappingWhereInput;
  }): Promise<PoiViewportListResponseDto> {
    const now = new Date();
    const pois: MarkerPoi[] = await this.prisma.poi.findMany({
      where: {
        tourDestinationId: input.tourDestinationId,
        isVisible: true,
        isDeleted: false,
        tourDestinations: {
          is: this.createActiveDestinationWhere(now),
        },
        facilityPoiMapping: {
          some: input.mappingWhere,
        },
      },
      orderBy: { id: 'asc' },
      take: POI_MARKER_MAX_ITEMS,
      select: {
        ...POI_MARKER_SELECT,
        facilityPoiMapping: {
          where: input.mappingWhere,
          select: POI_MARKER_SELECT.facilityPoiMapping.select,
        },
      },
    });

    return {
      items: pois
        .map((poi) => toPoiViewportItem(poi, input.language, now))
        .filter((item): item is NonNullable<typeof item> => item !== null),
    };
  }

  private createActiveDestinationWhere(now: Date): Prisma.TourDestinationWhereInput {
    return {
      isVisible: true,
      isDeleted: false,
      OR: [
        { isAlways: true },
        {
          startAt: { lte: now },
          endAt: { gte: now },
        },
      ],
    };
  }
}
