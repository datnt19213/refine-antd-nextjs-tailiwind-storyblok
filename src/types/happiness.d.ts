export interface Happiness {
  id: string;
  Overall_rank: number;
  Country_or_region: string;
  Score: number;
  GDP_per_capita: number;
  Social_support: number;
  Healthy_life_expectancy: number;
  Freedom_to_make_life_choices: number;
  Generosity: number;
  Perceptions_of_corruption: number;
  status: string;
  sort: number;
  user_created: string;
  date_created: string;
  user_updated: null;
  date_updated: null;
}
export interface HappinessForm {
  Overall_rank: number;
  Country_or_region: string;
  Score: number;
  GDP_per_capita: number;
  Social_support: number;
  Healthy_life_expectancy: number;
  Freedom_to_make_life_choices: number;
  Generosity: number;
  Perceptions_of_corruption: number;
}
