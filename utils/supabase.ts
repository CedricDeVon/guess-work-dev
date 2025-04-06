import 'react-native-url-polyfill/auto'
import 'react-native-get-random-values'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const supabase = createClient(
  process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL,
  process.env.EXPO_PUBLIC_SUPABASE_API_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  db: { schema: process.env.EXPO_PUBLIC_SUPABASE_BASE_SCHEMA_NAME }
})
