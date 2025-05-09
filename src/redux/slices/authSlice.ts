import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Session as SupabaseSession } from '@supabase/supabase-js'


// Define the auth state holding the Supabase session or null
interface AuthState {
  session: SupabaseSession | null
}

const initialState: AuthState = {
  session: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Save a SupabaseSession to Redux
    setSession(state, action: PayloadAction<SupabaseSession>) {
      state.session = action.payload
    },

    // Clear out the session on logout
    clearSession(state) {
      state.session = null
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
