export interface AwardResponse {
  id: string;
  photo_url: string | null;
  name: string;
  award_categories: {
    category: string;
  };
  award_titles: {
    title: string;
  };
  award_levels: {
    level: string;
  };
  award_date: string;
  organizer: string;
  organizer_url: string | null;
  student_name: string;
  student_classes: {
    class: string;
  };
  certificate_url: string | null;
  description: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface AwardsResponse {
  data: AwardResponse[];
  count: number;
}
