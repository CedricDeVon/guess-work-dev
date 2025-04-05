import { View } from 'react-native'
import { router } from 'expo-router'
import { useToastController } from '@tamagui/toast'
import { Button, XStack, YStack, Input, Spinner, Form, Checkbox, Label, ScrollView } from 'tamagui'

import useMainStore from '@/store/mainStore'
import { EyeIcon } from '@/components/EyeIcon'
import { CommonHeader } from '@/components/CommonHeader'
import { BrandingTitle } from '@/components/BrandingTitle'

import { SupabaseAPI } from '@/library/apis/supabaseApi'
import { defaultUserMetadata } from '@/utils/defaultConstants'
import { EmailValidator } from '@/library/validators/emailValidator'
import { UserNameValidator } from '@/library/validators/userNameValidator'
import { PasswordValidator } from '@/library/validators/passwordValidator'
import { ConfirmPasswordValidator } from '@/library/validators/confirmPasswordValidator'

export default function SignUp() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handleUsernameInputOnChangeText: Function = async (value: any) => {
        mainStore.updateAuthSignUpForm({ username: value })
    }

    const handleEmailInputOnChangeText: Function = async (value: any) => {
        mainStore.updateAuthSignUpForm({ email: value })
    }

    const handleShowPasswordInputOnPress: Function = async () => {
        mainStore.updateAuthSignUpForm({ showPassword: !mainStore.authSignUpForm?.showPassword })
    }

    const handlePasswordInputOnChangeText: Function = async (value: any) => {
        mainStore.updateAuthSignUpForm({ password: value })
    }

    const handleConfirmPasswordInputOnChangeText: Function = async (value: any) => {
        mainStore.updateAuthSignUpForm({ confirmPassword: value })
    }

    const handleSignUpFormSubmission: Function = async () => {
        try {
            mainStore.updateApplicationGlobalsToSubmitting()

            let currentResult: any = await UserNameValidator.singleton.validate(mainStore.authSignUpForm?.username)
            if (!currentResult.isSuccessful) {
                toast.show(currentResult.error, { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            currentResult = await EmailValidator.singleton.validate(mainStore.authSignUpForm?.email)
            if (!currentResult.isSuccessful) {
                toast.show(currentResult.error, { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            currentResult = await PasswordValidator.singleton.validate(mainStore.authSignUpForm?.password)
            if (!currentResult.isSuccessful) {
                toast.show(currentResult.error, { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            currentResult = await ConfirmPasswordValidator.singleton.validate(
                { password: mainStore.authSignUpForm?.password, confirmPassword: mainStore.authSignUpForm?.confirmPassword }
            )
            if (!currentResult.isSuccessful) {
                toast.show(currentResult.error, { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }


            currentResult = await SupabaseAPI.singleton.readOne(
                'user', { username: mainStore.authSignUpForm?.username },
                { 'selected-columns': '*' }
            )
            if (!currentResult.isSuccessful) {
                toast.show('Something\'s Wrong. Please Try Again', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            if (currentResult.data?.length) {
                toast.show('Username Already Exists', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            currentResult = await SupabaseAPI.singleton.readOne(
                'user', { email: mainStore.authSignUpForm?.email },
                { 'selected-columns': '*' }
            )
            if (!currentResult.isSuccessful) {
                toast.show('Something\'s Wrong. Please Try Again', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            if (currentResult.data?.length) {
                toast.show('Email Already Exists', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }


            currentResult = await SupabaseAPI.singleton.createUserViaEmailAndPassword(
                mainStore.authSignUpForm?.email, mainStore.authSignUpForm?.password)
            if (!currentResult.isSuccessful) {
                toast.show('Something\'s Wrong. Please Try Again', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            const userStateCreateResult: any = await SupabaseAPI.singleton.createOne(
                'auth-sign-up-user-state',
                'user_state', {
                    data: { user_status_type: 'active' }
                }
            )
            if (!userStateCreateResult.isSuccessful) {
                toast.show('Something\'s Wrong. Please Try Again', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            const userCreateResult: any = await SupabaseAPI.singleton.createOne(
                'auth-sign-up-user',
                'user', {
                    data: {
                        username: mainStore.authSignUpForm?.username,
                        email: mainStore.authSignUpForm?.email,
                        user_state_id: userStateCreateResult.data[0].id,
                        metadata: defaultUserMetadata
                    }
                }
            )
            if (!userCreateResult.isSuccessful) {
                toast.show('Something\'s Wrong. Please Try Again', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }


            const userGetResult: any = await SupabaseAPI.singleton.readOne(
                'user', { username: mainStore.authSignUpForm?.username },
                { 'selected-columns': '*, user_state(*)' }
            )
            if (!userGetResult.isSuccessful) {
                toast.show('Something\'s Wrong. Please Try Again', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            if (!userGetResult.data?.length) {
                toast.show('User Does Not Exist', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }

            toast.show('Success! Please Wait', { native: true })
            mainStore.updateUserAccount({ userData: userGetResult.data[0], userPassword: mainStore.authSignUpForm?.password })
            mainStore.updateApplicationGlobalsToUnSubmitting()

            router.push('/user/insights')

        } catch (error: any) {
            console.log(error)
            toast.show('Something\'s Wrong. Please Try Again', { native: true })
            mainStore.updateApplicationGlobalsToUnSubmitting()
            mainStore.resetAuthForms()
        }
    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>Hello from SignUp</Text>
            </View>
        </>
    )
}

/*
<CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }}/>
<YStack flex={1} alignItems='center' justifyContent='center'>
    <ScrollView>
        <View height='20%'></View>
        <Form onSubmit={handleSignUpFormSubmission}>
            <YStack gap='$5' alignItems='center' justifyContent='center'>
                <BrandingTitle/>
                <YStack width={300} gap='$3'>
                    <Input value={mainStore.authSignUpForm?.username} disabled={mainStore.applicationGlobals?.isDisabled} onChangeText={handleUsernameInputOnChangeText} maxLength={UserNameValidator.maxLength} placeholder='Username' size='$4' borderWidth={1}/>
                    <Input value={mainStore.authSignUpForm?.email} disabled={mainStore.applicationGlobals?.isDisabled} onChangeText={handleEmailInputOnChangeText} maxLength={EmailValidator.maxLength} placeholder='Email' size='$4' borderWidth={1}/>
                    <View></View>
                    <XStack gap='$3'>
                        <Input value={mainStore.authSignUpForm?.password} disabled={mainStore.applicationGlobals?.isDisabled} secureTextEntry={!mainStore.authSignUpForm?.showPassword} onChangeText={handlePasswordInputOnChangeText} maxLength={PasswordValidator.maxLength} placeholder='Password' size='$4' borderWidth={1} width='76%'/>
                        <Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleShowPasswordInputOnPress} backgroundColor='transparent' icon={<EyeIcon isOn={mainStore.authSignUpForm?.showPassword}/>}></Button>
                    </XStack>
                    <Input value={mainStore.authSignUpForm?.confirmPassword} disabled={mainStore.applicationGlobals?.isDisabled} secureTextEntry={!mainStore.authSignUpForm?.showPassword} onChangeText={handleConfirmPasswordInputOnChangeText} maxLength={PasswordValidator.maxLength} placeholder='Confirm Password' size='$4' borderWidth={1}/>
                    <View></View>
                    <Form.Trigger asChild disabled={mainStore.applicationGlobals?.isDisabled}>
                        <Button disabled={mainStore.applicationGlobals?.isDisabled} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.applicationGlobals?.isSubmitting) ? () => <Spinner color='$white2'/> : undefined}>
                            Sign Up
                        </Button>
                    </Form.Trigger>
                </YStack>
            </YStack>
        </Form>
    </ScrollView>
</YStack>
*/