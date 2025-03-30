import { useEffect } from 'react'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'

export default function HelpLayout() {
    SplashScreen.preventAutoHideAsync()

    const preLoadImports = async () => {
        
    }

    useEffect(() => {
        preLoadImports()
    }, [])

    return (
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
            
        </Stack>
    )
}

