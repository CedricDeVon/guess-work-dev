import '@/assets/styles/global.css'

import { useEffect } from 'react'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { TamaguiProvider } from 'tamagui'
import { PortalProvider } from '@tamagui/portal'
import { BackHandler, View } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import NetInfo from '@react-native-community/netinfo'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { tamaguiConfig } from '@/tamagui.config'

import useMainStore from '@/store/mainStore'

export default function RootLayout() {
    const mainStore: any = useMainStore()

    SplashScreen.preventAutoHideAsync()
    
    const [fontsLoaded, fontsLoadedError] = useFonts({
        'Ubuntu': require('@/assets/fonts/Ubuntu/Ubuntu-Light.ttf'),
    })
    
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            mainStore.updateNetworkStatus(state)
        })
        return () => unsubscribe()

    }, [])

    useEffect(() => {
        if (fontsLoaded || fontsLoadedError) {
            SplashScreen.hideAsync()
        }

    }, [fontsLoaded, fontsLoadedError])

    if (!fontsLoaded && !fontsLoadedError) {
        return null
    }

    return (
        <>
            <TamaguiProvider config={tamaguiConfig} defaultTheme={mainStore.currentStyleTheme}>
                <ToastProvider native={true} swipeDirection='left'>
                    <PortalProvider shouldAddRootHost>
                        <ThemeProvider value={mainStore.currentStyleTheme === 'dark' ? DarkTheme : DefaultTheme}>
                            <View style={{ flex: 1, backgroundColor: (mainStore.currentStyleTheme === 'dark') ? 'black' : 'white' }}>
                                <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
                                    <Stack.Screen name='index' options={{ headerShown: false, animation: 'fade' }} />
                                    <Stack.Screen name='+not-found' options={{ headerShown: false, animation: 'fade' }} />
                                </Stack>
                            </View>
                        </ThemeProvider>
                    </PortalProvider>
                </ToastProvider>
            </TamaguiProvider>
        </>
    )
}
