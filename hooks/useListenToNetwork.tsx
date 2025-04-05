import { useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo'

import useMainStore from '@/store/mainStore'

export function useListenToNetwork() {
    const mainStore: any = useMainStore()

    useEffect(() => {
        const unsubscribe: any = NetInfo.addEventListener((state: any) => {
            console.log(state)
            mainStore.updateNetworkState(state)
        })
        
        return () => unsubscribe()

    }, [])
}
