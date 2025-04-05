import { useCallback } from 'react'
import { BackHandler } from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router'

export function usePreventBackPress(prevent: boolean = true) {
    const router: any = useRouter()

    useFocusEffect(
        useCallback(() => {
            if (!prevent) return

            const onBackPress: Function = () => {
                return true
            }

            BackHandler.addEventListener('hardwareBackPress', onBackPress)
            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
            
        }, [prevent])
    )
}
