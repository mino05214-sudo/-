export type ScreenType =
  | 'IMPTI_DASHBOARD'
  | 'PRECISION_SAJU'
  | 'DAILY_FORTUNE'
  | 'RELATIONSHIP_COMPATIBILITY'
  | 'GENERAL_LIFE_ANALYSIS'
  | 'MBTI_HYBRID_ANALYSIS'
  | 'MBTI_SAJU_RESULT'
  | 'MBTI_REVERSE_INPUT';

export type TransitionType = 'push' | 'push_back' | 'none';

export interface SajuInput {
  birthDate: string;
  birthTime: string;
  birthPlace: string;
  isLunar: boolean;
}

export interface CompatibilityInput {
  birthDate: string;
  birthTime: string;
  gender: 'female' | 'male';
  isLunar: boolean;
}
