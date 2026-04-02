export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          phone: string
          created_at: string
        }
        Insert: {
          id?: string
          phone: string
          created_at?: string
        }
        Update: {
          id?: string
          phone?: string
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          order_id: string
          phone: string
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          order_id: string
          phone: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: string
          phone?: string
          status?: string
          created_at?: string
        }
      }
      devices: {
        Row: {
          id: number
          device_id: string
          user_id: string
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          device_id: string
          user_id: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          device_id?: string
          user_id?: string
          status?: string
          created_at?: string
        }
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
  }
}
