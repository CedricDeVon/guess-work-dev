import { View } from 'react-native'
import { router } from 'expo-router'
import { Button, YStack } from 'tamagui'

import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { BrandingTitle } from '@/components/BrandingTitle'
import { BrandingFooter } from '@/components/BrandingFooter'
import { usePreventBackPress } from '@/hooks/usePreventBackPress'

import('@/app/+not-found')
import('@/app/auth/log-in')
import('@/app/auth/sign-up')

export default function Index() {
    const mainStore: any = useMainStore()

    const handleLogInOnPress: Function = async () => {
        router.push('/auth/log-in')
    }

    const handlePlayOfflineOnPress: Function = async () => {
        mainStore.updateCurrentConnectionMode('offline')
        router.push('/user/training')
    }

    const handleSignUpOnPress: Function = async () => {
        router.push('/auth/sign-up')
    }

    usePreventBackPress()

    return (
        <>
            <CommonHeader showThemeChangeButton />
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <YStack gap='$5' alignItems='center' justifyContent='center'>
                    <BrandingTitle />
                    <YStack width={200} gap='$3'>
                        <Button onPress={handleLogInOnPress}>
                            Log In
                        </Button>
                        <Button onPress={handlePlayOfflineOnPress}>
                            Play Offline
                        </Button>
                    </YStack>
                    <View></View>
                    <YStack width={200} gap='$3'>
                        <Button onPress={handleSignUpOnPress}>
                            Sign Up
                        </Button>
                    </YStack>
                </YStack>
            </YStack>
            <BrandingFooter />
        </>
    )
}
