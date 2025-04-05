import { useCallback } from 'react'
import { useFocusEffect } from 'expo-router'

import useMainStore from '@/store/mainStore'

export function useDisableComponentsDuringNavigation() {
    const mainStore: any = useMainStore()

    useFocusEffect(
        useCallback(() => {
            mainStore.updateApplicationGlobalsToEnabled()

            return () => { mainStore.updateApplicationGlobalsToDisabled() }
        }, [])
    )
}
