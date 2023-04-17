// src/app/models.ts
export interface ElementMeasurement {
  id: number;
  qt: number;
  reef_water_element_id: number;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password_digest: string;
  invitation_accepted: boolean;
  invitation_token: string;
  invitation_expiration: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ElementMeasurement  {
  qt: number;
  reef_water_element_id: number;
  user_id: number;
}
