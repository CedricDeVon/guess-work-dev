import { View } from 'react-native'
import { router } from 'expo-router'
import { useToastController } from '@tamagui/toast'
import { Check, Eye, EyeOff } from '@tamagui/lucide-icons'
import { Button, XStack, YStack, Input, Spinner, Form, Checkbox, Label } from 'tamagui'

import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { BrandingTitle } from '@/components/BrandingTitle'
import { BrandingFooter } from '@/components/BrandingFooter'

export default function LogIn() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handleUsernameInputOnChangeText: Function = async (value: any) => {
        mainStore.updateLogInForm({ username: value })
    }

    const handleShowPasswordInputOnPress: Function = async () => {
        mainStore.updateLogInForm({ showPassword: !mainStore.logInForm?.showPassword })
    }

    const handlePasswordInputOnChangeText: Function = async (value: any) => {
        mainStore.updateLogInForm({ password: value })
    }

    const handleRememberMeOnCheckedChange: Function = async (value: any) => {
        mainStore.updateLogInForm({ rememberMe: value })
    }

    const handleLogInFormSubmission: Function = async () => {
        try {
            mainStore.updateLogInForm({ isSubmitting: true, isDisabled: true })

            toast.show('User Loged In, Please Wait', { native: true })

            router.push('/user/insights')

            mainStore.resetLogInForm()
            mainStore.updateCurrentConnectionMode('online')

        } catch (error: any) {
            console.log(error)
            toast.show('Unexpected Behavior Detected', { native: true })
            mainStore.resetLogInForm()
        }
    }

    return (
        <>
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }} showThemeChangeButton/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <Form onSubmit={handleLogInFormSubmission}>
                    <YStack gap='$5' alignItems='center' justifyContent='center'>
                        <BrandingTitle />
                        <YStack width={300} gap='$3'>
                            <Input value={mainStore.logInForm?.username} disabled={mainStore.logInForm?.isDisabled} onChangeText={handleUsernameInputOnChangeText} placeholder='Username' size='$4' borderWidth={1} />
                            <XStack gap='$3'>
                              <Input value={mainStore.logInForm?.password} secureTextEntry={!mainStore.logInForm?.showPassword} disabled={mainStore.logInForm?.isDisabled} onChangeText={handlePasswordInputOnChangeText} placeholder='Password' size='$4' borderWidth={1} width='76%' />
                              <Button disabled={mainStore.logInForm?.isDisabled} onPress={handleShowPasswordInputOnPress} backgroundColor='transparent' icon={(mainStore.logInForm?.showPassword) ? () => <EyeOff size='$1' /> : <Eye size='$1' />}></Button>
                            </XStack>
                            <XStack alignItems='center' justifyContent='center' gap='$4'>
                              <Checkbox value={mainStore.logInForm?.rememberMe} checked={mainStore.logInForm?.rememberMe} disabled={mainStore.logInForm?.isDisabled} onCheckedChange={handleRememberMeOnCheckedChange} size={'$5'}>
                                <Checkbox.Indicator>
                                  <Check />
                                </Checkbox.Indicator>
                              </Checkbox>
                            <Label size={'$4'}>Remember Me?</Label>
                            </XStack>
                            <View></View>
                            <Form.Trigger asChild disabled={mainStore.logInForm?.isDisabled}>
                                <Button disabled={mainStore.logInForm?.isDisabled} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.logInForm?.isSubmitting) ? () => <Spinner color='$white2' /> : undefined}>
                                    Log In
                                </Button>
                            </Form.Trigger>
                        </YStack>
                    </YStack>
                </Form>
            </YStack>
            <BrandingFooter />
        </>
    )
}

