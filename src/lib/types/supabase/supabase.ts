export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      award_categories: {
        Row: {
          category: string
          created_at: string | null
          id: string
        }
        Insert: {
          category: string
          created_at?: string | null
          id?: string
        }
        Update: {
          category?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
      award_levels: {
        Row: {
          created_at: string | null
          id: string
          level: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          level: string
        }
        Update: {
          created_at?: string | null
          id?: string
          level?: string
        }
        Relationships: []
      }
      award_titles: {
        Row: {
          created_at: string | null
          id: string
          title: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          title: string
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      awards: {
        Row: {
          award_category_id: string
          award_date: string
          award_level_id: string | null
          award_title_id: string | null
          certificate_url: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          officer_id: string | null
          organizer: string
          organizer_url: string | null
          photo_url: string | null
          slug: string
          student_class_id: string | null
          student_name: string
          updated_at: string | null
        }
        Insert: {
          award_category_id: string
          award_date: string
          award_level_id?: string | null
          award_title_id?: string | null
          certificate_url?: string | null
          created_at?: string | null
          description?: string | null
          id: string
          name: string
          officer_id?: string | null
          organizer: string
          organizer_url?: string | null
          photo_url?: string | null
          slug: string
          student_class_id?: string | null
          student_name: string
          updated_at?: string | null
        }
        Update: {
          award_category_id?: string
          award_date?: string
          award_level_id?: string | null
          award_title_id?: string | null
          certificate_url?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          officer_id?: string | null
          organizer?: string
          organizer_url?: string | null
          photo_url?: string | null
          slug?: string
          student_class_id?: string | null
          student_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "achievements_award_title_id_fkey"
            columns: ["award_title_id"]
            isOneToOne: false
            referencedRelation: "award_titles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "achievements_student_class_id_fkey"
            columns: ["student_class_id"]
            isOneToOne: false
            referencedRelation: "student_classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_award_category_id_fkey"
            columns: ["award_category_id"]
            isOneToOne: false
            referencedRelation: "award_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_award_level_id_fkey"
            columns: ["award_level_id"]
            isOneToOne: false
            referencedRelation: "award_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "awards_officer_id_fkey"
            columns: ["officer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      esbozz_data: {
        Row: {
          activities: string[] | null
          created_at: string
          focus: string | null
          id: string
          join_us_url: string | null
          mission: string | null
          updated_at: string
        }
        Insert: {
          activities?: string[] | null
          created_at?: string
          focus?: string | null
          id?: string
          join_us_url?: string | null
          mission?: string | null
          updated_at?: string
        }
        Update: {
          activities?: string[] | null
          created_at?: string
          focus?: string | null
          id?: string
          join_us_url?: string | null
          mission?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      esbozz_officers: {
        Row: {
          created_at: string
          id: string
          it_manager_1: string | null
          it_manager_2: string | null
          officers: string[] | null
          president: string | null
          secretary_1: string | null
          secretary_2: string | null
          treasurer_1: string | null
          treasurer_2: string | null
          updated_at: string
          vice_president: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          it_manager_1?: string | null
          it_manager_2?: string | null
          officers?: string[] | null
          president?: string | null
          secretary_1?: string | null
          secretary_2?: string | null
          treasurer_1?: string | null
          treasurer_2?: string | null
          updated_at?: string
          vice_president?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          it_manager_1?: string | null
          it_manager_2?: string | null
          officers?: string[] | null
          president?: string | null
          secretary_1?: string | null
          secretary_2?: string | null
          treasurer_1?: string | null
          treasurer_2?: string | null
          updated_at?: string
          vice_president?: string | null
        }
        Relationships: []
      }
      esbozz_partners: {
        Row: {
          created_at: string
          id: string
          logo: string
          name: string
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo?: string
          name?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo?: string
          name?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          date: string
          deleted_at: string | null
          description: string | null
          event_maker_id: string
          event_maker_name: string | null
          event_maker_username: string | null
          id: string
          image_url: string | null
          is_anonymous: boolean
          location: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          date: string
          deleted_at?: string | null
          description?: string | null
          event_maker_id: string
          event_maker_name?: string | null
          event_maker_username?: string | null
          id: string
          image_url?: string | null
          is_anonymous?: boolean
          location: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string
          deleted_at?: string | null
          description?: string | null
          event_maker_id?: string
          event_maker_name?: string | null
          event_maker_username?: string | null
          id?: string
          image_url?: string | null
          is_anonymous?: boolean
          location?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_event_maker_name_fkey"
            columns: ["event_maker_name"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["full_name"]
          },
          {
            foreignKeyName: "events_event_maker_username_fkey"
            columns: ["event_maker_username"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["username"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          nickname: string | null
          updated_at: string
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          nickname?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          nickname?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      student_classes: {
        Row: {
          class: string
          created_at: string | null
          id: string
        }
        Insert: {
          class: string
          created_at?: string | null
          id?: string
        }
        Update: {
          class?: string
          created_at?: string | null
          id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const
