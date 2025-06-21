export interface PerformanceSummary {
  average_performance: number;
  quarterly_performance: {
    quarter: string;
    average: number;
  }[];
  monthly_performance: {
    month: string;
    performance: number;
  }[];
  daily_performance: {
    date: string;
    day: string;
    performance: number;
  }[];
  meta?: {
    year: number;
    last_n_days: number;
  };
}

export interface RankingData {
  rank: number;
  total_users: number;
  top_performers: {
    name: string;
    performance: number;
  }[];
}

export interface ScoreCalculation {
  total_points: number;
  max_points: number;
  breakdown: {
    metric: string;
    points: number;
    max_points: number;
  }[];
}