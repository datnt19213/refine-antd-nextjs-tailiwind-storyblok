import {
  FORMBRICK_QUESTION_TYPE,
  KeyQuestionType,
} from '../configs/index';

export interface SurveyData {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  type: string;
  environmentId: string;
  createdBy: string;
  status: string;
  welcomeCard: WelcomeCard;
  questions: Question[];
  endings: Ending[];
  hiddenFields: HiddenFields;
  variables: any[];
  displayOption: string;
  recontactDays: null;
  displayLimit: number;
  autoClose: null;
  runOnDate: null;
  closeOnDate: null;
  delay: number;
  displayPercentage: null;
  autoComplete: null;
  isVerifyEmailEnabled: boolean;
  isSingleResponsePerEmailEnabled: boolean;
  isBackButtonHidden: boolean;
  redirectUrl: null;
  projectOverwrites: null;
  styling: Styling;
  surveyClosedMessage: null;
  singleUse: SingleUse;
  pin: null;
  resultShareKey: null;
  showLanguageSwitch: null;
  languages: any[];
  triggers: Trigger[];
  segment: Segment;
  followUps: any[];
}

export interface Segment {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: null;
  isPrivate: boolean;
  filters: any[];
  environmentId: string;
  surveys: string[];
}

export interface Trigger {
  actionClass: ActionClass;
}

export interface ActionClass {
  id: string;
  createdAt: string;
  updatedAt: string;
  environmentId: string;
  name: string;
  description: string;
  type: string;
  key: null;
  noCodeConfig: NoCodeConfig;
}

export interface NoCodeConfig {
  type: string;
  urlFilters: any[];
}

export interface SingleUse {
  enabled: boolean;
  isEncrypted: boolean;
}

export interface Styling {
  roundness: number;
  background: Background;
  brandColor: BrandColor;
  inputColor: BrandColor;
  isLogoHidden: boolean;
  questionColor: BrandColor;
  cardArrangement: CardArrangement;
  cardBorderColor: BrandColor;
  cardShadowColor: BrandColor;
  inputBorderColor: BrandColor;
  isDarkModeEnabled: boolean;
  cardBackgroundColor: BrandColor;
  overwriteThemeStyling: boolean;
}

export interface CardArrangement {
  appSurveys: string;
  linkSurveys: string;
}

export interface BrandColor {
  light: string;
}

export interface Background {
  bg: string;
  bgType: string;
}

export interface HiddenFields {
  enabled: boolean;
  fieldIds: any[];
}

export interface Ending {
  id: string;
  type: string;
  headline: Html;
  subheader: Html;
  buttonLink: string;
  buttonLabel: Html;
}

export interface Question {
  id: string;
  type: keyof typeof KeyQuestionType;
  logic: Logic[];
  headline: Html;
  required: boolean;
  charLimit?: CharLimit;
  inputType?: string;
  buttonLabel: Html;
  placeholder?: Html;
  choices?: Choice[];
  shuffleOption?: string;
  backButtonLabel?: Html;
  range?: number;
  scale?: string;
  lowerLabel?: Html;
  upperLabel?: Html;
  isColorCodingEnabled?: boolean;
  rows?: Html[];
  columns?: Html[];
  html?: Html;
  buttonExternal?: boolean;
  dismissButtonLabel?: Html;
  label?: Html;
  imageUrl?: string;
  videoUrl?: string;
  maxSizeInMB?: number;
  allowMultipleFiles?: boolean;
  allowedFileExtensions?: string[];
  format?: string;
  calUserName?: string;
  zip?: Zip;
  city?: Zip;
  state?: Zip;
  country?: Zip;
  addressLine1?: Zip;
  addressLine2?: Zip;
  email?: Zip;
  phone?: Zip;
  company?: Zip;
  lastName?: Zip;
  firstName?: Zip;
}

export interface Zip {
  show: boolean;
  required: boolean;
  placeholder: Html;
}

export interface Choice {
  id: string;
  label: Html;
}

export interface CharLimit {
  max: number;
  min: number;
  enabled: boolean;
}

export interface Logic {
  id: string;
  actions: Action[];
  conditions: Conditions;
}

export interface Conditions {
  id: string;
  connector: string;
  conditions: Condition[];
}

export interface Condition {
  id: string;
  operator: string;
  leftOperand: LeftOperand;
}

export interface LeftOperand {
  type: string;
  value: string;
}

export interface Action {
  id: string;
  target: string;
  objective: string;
}

export interface WelcomeCard {
  html: Html;
  enabled: boolean;
  headline: Html;
  buttonLabel: Html;
  timeToFinish: boolean;
  showResponseCount: boolean;
}

export interface Html {
  default: string;
}
