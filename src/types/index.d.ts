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
