import 'react-native-url-polyfill/auto'
import 'react-native-get-random-values'
import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { EnvironmentConfiguration } from '../library/configurations/environmentConfiguration'
import { Method2CipherCryptographer } from '../library/cryptographers/method2CipherCryptographer'

export const supabase = createClient(
  Method2CipherCryptographer.singleton.decrypt(EnvironmentConfiguration.singleton.getRawValue('EXPO_PUBLIC_SUPABASE_PROJECT_URL').data).data,
  Method2CipherCryptographer.singleton.decrypt(EnvironmentConfiguration.singleton.getRawValue('EXPO_PUBLIC_SUPABASE_API_KEY').data).data, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  db: { schema: Method2CipherCryptographer.singleton.decrypt(EnvironmentConfiguration.singleton.getRawValue('EXPO_PUBLIC_SUPABASE_BASE_SCHEMA_NAME').data).data }
})
