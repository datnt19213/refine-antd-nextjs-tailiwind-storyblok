interface SurveyForm {
  surveyId: string;
  meta: Meta;
  finished: boolean;
  createdAt: string;
  updatedAt: string;
  data: Data;
  language: string;
}

interface Data {
  test: string[];
}

interface Meta {
  test: string;
}

// interface SurveyForm in formbrick

export interface BaseQuestion {
  type: string;
  question: string;
  description?: string;
  required?: boolean;
}

export interface ChoiceOption {
  id: string;
  label: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: "single_choice";
  options: ChoiceOption[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: "multiple_choice";
  options: ChoiceOption[];
  max_selections?: number;
}

export interface LikertScaleQuestion extends BaseQuestion {
  type: "likert_scale";
  scale: {
    min: number;
    max: number;
    labels: Record<string, string>;
  };
}

export interface RatingQuestion extends BaseQuestion {
  type: "rating";
  max_stars: number;
}

export interface RankingQuestion extends BaseQuestion {
  type: "ranking";
  options: ChoiceOption[];
}

export interface MatrixQuestion extends BaseQuestion {
  type: "matrix";
  rows: ChoiceOption[];
  columns: ChoiceOption[];
}

export interface OpenEndedQuestion extends BaseQuestion {
  type: "open_ended";
  max_length?: number;
}

export interface DemographicQuestion extends BaseQuestion {
  type: "demographic";
  options: ChoiceOption[];
}

export interface NpsQuestion extends BaseQuestion {
  type: "nps";
  scale: {
    min: number;
    max: number;
    labels: Record<string, string>;
  };
}

export interface SliderQuestion extends BaseQuestion {
  type: "slider";
  min: number;
  max: number;
  step?: number;
}

export interface FileUploadQuestion extends BaseQuestion {
  type: "file_upload";
  allowed_formats?: string[];
  max_size_mb?: number;
}

export interface DateQuestion extends BaseQuestion {
  type: "date";
}

export interface EmailQuestion extends BaseQuestion {
  type: "email";
  validation: "email";
}

export interface NumericQuestion extends BaseQuestion {
  type: "numeric";
  min?: number;
  max?: number;
}

export interface ShortTextQuestion extends BaseQuestion {
  type: "short_text";
  max_length?: number;
}

export interface LongTextQuestion extends BaseQuestion {
  type: "long_text";
  max_length?: number;
}

export interface ClapVotingQuestion extends BaseQuestion {
  type: QuestionType.ClapVoting;
  options: ChoiceOption[];
  max_claps?: number;
}

export type SurveyQuestion =
  | SingleChoiceQuestion
  | MultipleChoiceQuestion
  | LikertScaleQuestion
  | RatingQuestion
  | RankingQuestion
  | MatrixQuestion
  | OpenEndedQuestion
  | DemographicQuestion
  | NpsQuestion
  | SliderQuestion
  | FileUploadQuestion
  | DateQuestion
  | EmailQuestion
  | NumericQuestion
  | ShortTextQuestion
  | LongTextQuestion
  | ClapVotingQuestion;
