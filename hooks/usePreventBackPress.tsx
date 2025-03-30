import { useCallback } from 'react'
import { BackHandler } from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router'

export function usePreventBackPress(prevent: boolean = true) {
  const router = useRouter()

  useFocusEffect(
    useCallback(() => {
      if (!prevent) return

      const onBackPress = () => {
        return true
      }

      BackHandler.addEventListener('hardwareBackPress', onBackPress)
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      
    }, [prevent])
  )
}
