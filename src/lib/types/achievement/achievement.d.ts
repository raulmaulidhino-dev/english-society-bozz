export interface AchievementResponse {
  id: string;
  photo_url: string | null;
  event_name: string;
  achievement_event_types: {
    type: string;
  };
  award_titles: {
    title: string;
  };
  achievement_levels: {
    level: string;
  };
  achievement_date: string;
  organizer: string;
  student_name: string;
  student_classes: {
    class: string;
  }
  certificate_url: string | null;
  description: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface AchievementsResponse {
  data: AchievementResponse[];
  count: number;
}