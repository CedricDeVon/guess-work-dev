import { View } from 'react-native'
import { useCallback } from 'react'
import { router } from 'expo-router'
import { Button, YStack, Spinner } from 'tamagui'
import { useToastController } from '@tamagui/toast'

import { CommonHeader } from '@/components/CommonHeader'
import { BrandingTitle } from '@/components/BrandingTitle'
import { BrandingFooter } from '@/components/BrandingFooter'
import { usePreventBackPress } from '@/hooks/usePreventBackPress'
import { useDisableComponentsDuringNavigation } from '@/hooks/useDisableComponentsDuringNavigation'

import useMainStore from '@/store/mainStore'

/*
import('@/app/+not-found')
import('@/app/auth/log-in')
import('@/app/auth/sign-up')
*/

export default function Index() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handlePlayOnPress: Function = async () => {
        mainStore.updateApplicationGlobalsToSubmitting()

        toast.show('Success! Please Wait', { native: true })
        mainStore.updateApplicationGlobalsToUnSubmitting()
        mainStore.resetAuthForms()

        router.push('/user/training')
    }

    const handleLogInOnPress: Function = async () => {
        router.push('/auth/log-in')
    }

    const handleSignUpOnPress: Function = async () => {
        router.push('/auth/sign-up')
    }

    usePreventBackPress()
    useDisableComponentsDuringNavigation()

    return (
        <>
            <CommonHeader/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <YStack gap='$5' alignItems='center' justifyContent='center'>
                    <BrandingTitle />
                    {
                        mainStore.userAccount && (
                            <YStack width={200} gap='$3'>
                                <Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handlePlayOnPress} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.applicationGlobals?.isSubmitting) ? () => <Spinner color='$white2'/> : undefined}>
                                    Play
                                </Button>
                            </YStack>
                        )
                    }
                    <YStack width={200} gap='$3'>
                        <Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleLogInOnPress}>
                            Log In
                        </Button>
                        <Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleSignUpOnPress}>
                            Sign Up
                        </Button>
                    </YStack>
                </YStack>
            </YStack>
            <BrandingFooter />
        </>
    )
}
