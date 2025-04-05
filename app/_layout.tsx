import '@/assets/styles/global.css'

import { useEffect } from 'react'
import { View, BackHandler } from 'react-native'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { TamaguiProvider } from 'tamagui'
import { PortalProvider } from '@tamagui/portal'
import * as SplashScreen from 'expo-splash-screen'
import { ToastProvider, ToastViewport } from '@tamagui/toast'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { tamaguiConfig } from '@/tamagui.config'

import useMainStore from '@/store/mainStore'
import { useListenToNetwork } from '@/hooks/useListenToNetwork'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
    const mainStore: any = useMainStore()    
    
    useListenToNetwork()

    const [loaded, error] = useFonts({
        'Ubuntu': require('../assets/fonts/Ubuntu/Ubuntu-Light.ttf'),
    })

    const [fontsLoaded] = useFonts({
        Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
        InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
    })

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync()
        }

    }, [fontsLoaded])

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync()
        }

    }, [loaded, error])

    if (!fontsLoaded) {
        return null
    }

    if (!loaded && !error) {
        return null
    }

    return (
        <>
            <TamaguiProvider config={tamaguiConfig} defaultTheme={mainStore.currentStyleTheme}>
                <ToastProvider native={true} swipeDirection='left'>
                    <PortalProvider shouldAddRootHost>
                        <ThemeProvider value={mainStore.currentStyleTheme === 'dark' ? DarkTheme : DefaultTheme}>
                            <View style={{ flex: 1, backgroundColor: (mainStore.currentStyleTheme === 'dark') ? 'black' : 'white' }}>
                                <Stack screenOptions={{ headerShown: false }}>
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
