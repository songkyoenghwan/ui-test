import { Module } from '@nestjs/common';
import { TourDestinationBasicSurveySubmissionService } from './tour-destination-basic-survey-submission.service';
import { TourDestinationsController } from './tour-destinations.controller';
import { TourDestinationsService } from './tour-destinations.service';

@Module({
  controllers: [TourDestinationsController],
  providers: [TourDestinationsService, TourDestinationBasicSurveySubmissionService],
})
export class TourDestinationsModule {}
