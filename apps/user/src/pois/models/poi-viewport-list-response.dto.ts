import { ApiProperty } from '@nestjs/swagger';
import { PoiViewportItemResponseDto } from './poi-viewport-item-response.dto';

export class PoiViewportListResponseDto {
  @ApiProperty({ type: [PoiViewportItemResponseDto] })
  items: PoiViewportItemResponseDto[];
}
