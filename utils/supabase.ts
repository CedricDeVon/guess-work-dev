import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { EnvironmentConfiguration } from '@/library/configurations/environmentConfiguration'

export const supabase = createClient(
  EnvironmentConfiguration.singleton.getValue('EXPO_PUBLIC_SUPABASE_PROJECT_URL').data,
  EnvironmentConfiguration.singleton.getValue('EXPO_PUBLIC_SUPABASE_API_KEY').data, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  db: { schema: EnvironmentConfiguration.singleton.getValue('EXPO_PUBLIC_SUPABASE_BASE_SCHEMA_NAME').data }
})
