export const TOUR_DESTINATION_LANGUAGES = ['ko', 'en', 'ja', 'zh', 'th', 'vi'] as const;

export type TourDestinationLanguage = (typeof TOUR_DESTINATION_LANGUAGES)[number];

export const ACTIVE_ONBOARDING_DEPLOYMENT_STATUS = 'DEPLOYING';

export const DEFAULT_ENTRY_THUMBNAIL_URL = 'https://placehold.co/640x360/png?text=Tour+Destination';

export const MAX_ONBOARDING_ITEMS = 10;

export const BASIC_SURVEY_QUESTION_TYPES = ['SINGLE', 'MULTI'] as const;

export type BasicSurveyQuestionType = (typeof BASIC_SURVEY_QUESTION_TYPES)[number];

export const MAX_BASIC_SURVEY_QUESTIONS = 10;

export const MAX_BASIC_SURVEY_OPTIONS = 8;

export const MIN_MULTI_BASIC_SURVEY_OPTIONS = 1;

export const BASIC_SURVEY_SUBMISSION_STATUS = {
  SUBMITTED: 'SUBMITTED',
  SKIPPED: 'SKIPPED',
} as const;

export type BasicSurveySubmissionStatus =
  (typeof BASIC_SURVEY_SUBMISSION_STATUS)[keyof typeof BASIC_SURVEY_SUBMISSION_STATUS];

export const ONBOARDING_FILE_TYPE = {
  MAIN: 'MAIN',
  MAIN_GLOBAL: 'MAIN_GLOBAL',
  THUMBNAIL: 'THUMBNAIL',
  THUMBNAIL_GLOBAL: 'THUMBNAIL_GLOBAL',
} as const;
