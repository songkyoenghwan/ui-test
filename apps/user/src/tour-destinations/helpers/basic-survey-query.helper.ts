import { Prisma } from '../../generated/prisma/client';
import {
  ACTIVE_ONBOARDING_DEPLOYMENT_STATUS,
  BASIC_SURVEY_QUESTION_TYPES,
} from '../constants/tour-destination.constant';

export function createActiveTourDestinationWhere(now: Date): Prisma.TourDestinationWhereInput {
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

export function createActiveBasicSurveyQuestionWhere(
  now: Date,
): Prisma.OnboardingBasicSurveyQuestionWhereInput {
  return {
    isVisible: true,
    isDeleted: false,
    deploymentStatus: ACTIVE_ONBOARDING_DEPLOYMENT_STATUS,
    questionType: { in: [...BASIC_SURVEY_QUESTION_TYPES] },
    deployedAt: { lte: now },
    OR: [{ deploymentEndedAt: null }, { deploymentEndedAt: { gte: now } }],
    onboardingBasicSurveyOptions: {
      some: createActiveBasicSurveyOptionWhere(),
    },
  };
}

export function createActiveBasicSurveyOptionWhere(): Prisma.OnboardingBasicSurveyOptionWhereInput {
  return {
    isVisible: true,
    isDeleted: false,
    isActive: true,
  };
}
