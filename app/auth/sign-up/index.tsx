import { View } from 'react-native'
import { router } from 'expo-router'
import { useToastController } from '@tamagui/toast'
import { Check, Eye, EyeOff } from '@tamagui/lucide-icons'
import { Button, XStack, YStack, Input, Spinner, Form, Checkbox, Label } from 'tamagui'

import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { BrandingTitle } from '@/components/BrandingTitle'
import { BrandingFooter } from '@/components/BrandingFooter'

export default function SignUp() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handleUsernameInputOnChangeText: Function = async (value: any) => {
        mainStore.updateSignUpForm({ username: value })
    }

    const handleEmailInputOnChangeText: Function = async (value: any) => {
        mainStore.updateSignUpForm({ email: value })
    }

    const handleShowPasswordInputOnPress: Function = async () => {
        mainStore.updateSignUpForm({ showPassword: !mainStore.signUpForm?.showPassword })
    }

    const handlePasswordInputOnChangeText: Function = async (value: any) => {
        mainStore.updateSignUpForm({ password: value })
    }

    const handleConfirmPasswordInputOnChangeText: Function = async (value: any) => {
        mainStore.updateSignUpForm({ confirmPassword: value })
    }

    const handleRememberMeOnCheckedChange: Function = async (value: any) => {
        mainStore.updateSignUpForm({ rememberMe: value })
    }

    const handleSignUpFormSubmission: Function = async () => {
        try {
            mainStore.updateSignUpForm({ isSubmitting: true, isDisabled: true })

            toast.show('User Signed Up, Please Wait', { native: true })

            router.push('/user/training')

            mainStore.resetSignUpForm()
            mainStore.updateCurrentConnectionMode('online')

        } catch (error: any) {
            console.log(error)
            toast.show('Unexpected Behavior Detected', { native: true })
            mainStore.resetSignUpForm()
        }
    }

    return (
        <>
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }} showThemeChangeButton/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <Form onSubmit={handleSignUpFormSubmission}>
                    <YStack gap='$5' alignItems='center' justifyContent='center'>
                        <BrandingTitle />
                        <YStack width={300} gap='$3'>
                            <Input value={mainStore.signUpForm?.username} disabled={mainStore.signUpForm?.isDisabled} onChangeText={handleUsernameInputOnChangeText} placeholder='Username' size='$4' borderWidth={1} />
                            <Input value={mainStore.signUpForm?.email} disabled={mainStore.signUpForm?.isDisabled} onChangeText={handleEmailInputOnChangeText} placeholder='Email' size='$4' borderWidth={1} />
                            <View></View>
                            <XStack gap='$3'>
                                <Input value={mainStore.signUpForm?.password} disabled={mainStore.signUpForm?.isDisabled} secureTextEntry={!mainStore.signUpForm?.showPassword} onChangeText={handlePasswordInputOnChangeText} placeholder='Password' size='$4' borderWidth={1} width='76%' />
                                <Button disabled={mainStore.signUpForm?.isDisabled} onPress={handleShowPasswordInputOnPress} backgroundColor='transparent' icon={(mainStore.signUpForm?.showPassword) ? () => <EyeOff size='$1' /> : <Eye size='$1' />}></Button>
                            </XStack>
                            <Input value={mainStore.signUpForm?.confirmPassword} disabled={mainStore.signUpForm?.isDisabled} secureTextEntry={!mainStore.signUpForm?.showPassword} onChangeText={handleConfirmPasswordInputOnChangeText} placeholder='Confirm Password' size='$4' borderWidth={1} />
                            <XStack alignItems='center' justifyContent='center' gap='$4'>
                              <Checkbox value={mainStore.signUpForm?.rememberMe} disabled={mainStore.signUpForm?.isDisabled} checked={mainStore.signUpForm?.rememberMe} onCheckedChange={handleRememberMeOnCheckedChange} size={'$5'}>
                                <Checkbox.Indicator>
                                  <Check />
                                </Checkbox.Indicator>
                              </Checkbox>
                              <Label size={'$4'}>Remember Me?</Label>
                            </XStack>
                            <View></View>
                            <Form.Trigger asChild disabled={mainStore.signUpForm?.isDisabled}>
                                <Button disabled={mainStore.signUpForm?.isDisabled} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.signUpForm?.isDisabled) ? () => <Spinner color='$white2' /> : undefined}>
                                    Sign Up
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

