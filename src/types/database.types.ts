
export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          user_id: string;
          created_at: string;
          date: string;
          time: string;
          service: string;
          status: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          created_at?: string;
          date: string;
          time: string;
          service: string;
          status: string;
        };
        Update: Partial<Database['public']['Tables']['bookings']['Insert']>;
      };
      // Add other tables like `users`, `subscriptions`, etc.
    };
  };
};
