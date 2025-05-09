import * as Yup from 'yup';

const phoneRegex = /^\+?\d{10,15}$/; // adjust to your locale

export const LoginSchema = Yup.object().shape({
  identifier: Yup.string()
    .required('Email or phone number is required')
    .test(
      'is-email-or-phone',
      'Must be a valid email or phone number',
      (value = '') =>
        // simple email check
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
        // or phone check
        phoneRegex.test(value)
    ),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export type LoginDataType = Yup.InferType<typeof LoginSchema>;

export const LoginInitialValues: LoginDataType = {
  identifier: '',
  password: '',
};

// types/auth.ts

// identity object
export interface SupabaseIdentity {
  identity_id: string
  id: string
  user_id: string
  identity_data: {
    email: string
    email_verified: boolean
    phone_verified: boolean
    sub: string
  }
  provider: string
  last_sign_in_at: string
  created_at: string
  updated_at: string
  email: string
}

// metadata stored on the JWT
export interface SupabaseAppMetadata {
  provider: 'email' | string
  providers: string[]
}
export interface SupabaseUserMetadata {
  email: string
  email_verified: boolean
  phone_verified: boolean
  sub: string
}

// the “user” object
export interface SupabaseUser {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string | null
  phone: string
  confirmation_sent_at: string | null
  confirmed_at: string | null
  last_sign_in_at: string
  app_metadata: SupabaseAppMetadata
  user_metadata: SupabaseUserMetadata
  identities: SupabaseIdentity[]
  created_at: string
  updated_at: string
  is_anonymous: boolean
}

// the full session payload
export interface SupabaseSession {
  access_token: string
  token_type: 'bearer'
  expires_in: number
  expires_at: number
  refresh_token: string
  user: SupabaseUser
}

