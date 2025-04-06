import { View, Text, ScrollView } from 'react-native'
import { router } from 'expo-router'
import { Button, XStack, YStack, Input, Spinner, Form, Checkbox, Label } from 'tamagui'

import { EyeIcon } from '@/components/EyeIcon'
import { CommonHeader } from '@/components/CommonHeader'
import { BrandingTitle } from '@/components/BrandingTitle'

import useMainStore from '@/store/mainStore'
import { SupabaseAPI } from '@/library/apis/supabaseApi'
import { EmailValidator } from '@/library/validators/emailValidator'
import { PasswordValidator } from '@/library/validators/passwordValidator'

export default function LogIn() {
    const mainStore: any = useMainStore()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handleEmailInputOnChangeText: Function = async (value: any) => {
        mainStore.updateAuthLogInForm({ email: value })
    }

    const handleShowPasswordInputOnPress: Function = async () => {
        mainStore.updateAuthLogInForm({ showPassword: !(mainStore.authLogInForm?.showPassword) })
    }

    const handlePasswordInputOnChangeText: Function = async (value: any) => {
        mainStore.updateAuthLogInForm({ password: value })
    }

    const handleLogInFormSubmission: Function = async () => {
        try {
            mainStore.updateApplicationGlobalsToSubmitting()

            if (!(mainStore.authLogInForm?.email) || !(mainStore.authLogInForm?.password)) {
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }

            const userGetResult: any = await SupabaseAPI.singleton.readOne( // (SupabaseAPI) CULPRIT
                'user',
                { email: mainStore.authLogInForm?.email },
                { 'selected-columns': '*, user_state(*)' }
            )
            if (!userGetResult.isSuccessful) {
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            if (!userGetResult.data?.length) {
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            const userAuthResult: any = await SupabaseAPI.singleton.logInUserViaEmailAndPassword(
                userGetResult.data[0].email, mainStore.authLogInForm?.password
            )
            if (!userAuthResult.isSuccessful) {
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }

            mainStore.updateUserAccount({ userData: userGetResult.data[0], userPassword: mainStore.authLogInForm?.password })
            mainStore.updateApplicationGlobalsToUnSubmitting()
            mainStore.resetAuthForms()

            router.push('/user/insights')

        } catch (error: any) {
            mainStore.updateApplicationGlobalsToUnSubmitting()
            mainStore.resetAuthForms()
        }
    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'red' }}>Hello from Login</Text>
            </View>
        </>
    )
}

/*



try {
    mainStore.updateApplicationGlobalsToSubmitting()

    if (!(mainStore.authLogInForm?.email) || !(mainStore.authLogInForm?.password)) {
        // toast.show('Please Input Your email And Password', { native: true })
        mainStore.updateApplicationGlobalsToUnSubmitting()
        return
    }

    const userGetResult: any = await SupabaseAPI.singleton.readOne(
        'user',
        { email: mainStore.authLogInForm?.email },
        { 'selected-columns': '*, user_state(*)' }
    )
    if (!userGetResult.isSuccessful) {
        // toast.show('Something\'s Wrong. Please Try Again', { native: true })
        mainStore.updateApplicationGlobalsToUnSubmitting()
        return
    }
    if (!userGetResult.data?.length) {
        // toast.show('User Does Not Exist', { native: true })
        mainStore.updateApplicationGlobalsToUnSubmitting()
        return
    }
    const userAuthResult: any = await SupabaseAPI.singleton.logInUserViaEmailAndPassword(
        userGetResult.data[0].email, mainStore.authLogInForm?.password
    )
    if (!userAuthResult.isSuccessful) {
        // toast.show('Invalid Password. Please Try Again', { native: true })
        mainStore.updateApplicationGlobalsToUnSubmitting()
        return
    }

    // toast.show('Success! Please Wait', { native: true })
    mainStore.updateUserAccount({ userData: userGetResult.data[0], userPassword: mainStore.authLogInForm?.password })
    mainStore.updateApplicationGlobalsToUnSubmitting()
    mainStore.resetAuthForms()

    router.push('/user/insights')

} catch (error: any) {
    // toast.show('Something\'s Wrong. Please Try Again', { native: true })
    mainStore.updateApplicationGlobalsToUnSubmitting()
    mainStore.resetAuthForms()
}

import { View } from 'react-native'
import { router } from 'expo-router'
import { useToastController } from '@tamagui/toast'
import { Button, XStack, YStack, Input, Spinner, Form, Checkbox, Label, ScrollView } from 'tamagui'

import useMainStore from '@/store/mainStore'
import { EyeIcon } from '@/components/EyeIcon'
import { CommonHeader } from '@/components/CommonHeader'
import { BrandingTitle } from '@/components/BrandingTitle'

import { SupabaseAPI } from '@/library/apis/supabaseApi'
import { EmailValidator } from '@/library/validators/emailValidator'
import { PasswordValidator } from '@/library/validators/passwordValidator'

export default function LogIn() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handleEmailInputOnChangeText: Function = async (value: any) => {
        mainStore.updateAuthLogInForm({ email: value })
    }

    const handleShowPasswordInputOnPress: Function = async () => {
        mainStore.updateAuthLogInForm({ showPassword: !mainStore.authLogInForm?.showPassword })
    }

    const handlePasswordInputOnChangeText: Function = async (value: any) => {
        mainStore.updateAuthLogInForm({ password: value })
    }

    const handleLogInFormSubmission: Function = async () => {
        try {
            mainStore.updateApplicationGlobalsToSubmitting()

            if (!(mainStore.authLogInForm?.email) || !(mainStore.authLogInForm?.password)) {
                toast.show('Please Input Your email And Password', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }

            const userGetResult: any = await SupabaseAPI.singleton.readOne(
                'user',
                { email: mainStore.authLogInForm?.email },
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
            const userAuthResult: any = await SupabaseAPI.singleton.logInUserViaEmailAndPassword(
                userGetResult.data[0].email, mainStore.authLogInForm?.password
            )
            if (!userAuthResult.isSuccessful) {
                toast.show('Invalid Password. Please Try Again', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }

            toast.show('Success! Please Wait', { native: true })
            mainStore.updateUserAccount({ userData: userGetResult.data[0], userPassword: mainStore.authLogInForm?.password })
            mainStore.updateApplicationGlobalsToUnSubmitting()
            mainStore.resetAuthForms()

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
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }}/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView>
                    <View height='60%'></View>
                    <Form onSubmit={handleLogInFormSubmission}>
                        <YStack gap='$5' alignItems='center' justifyContent='center'>
                            <BrandingTitle/>
                            <YStack width={300} gap='$3'>
                                <Input value={mainStore.authLogInForm?.email} disabled={mainStore.applicationGlobals?.isDisabled} onChangeText={handleEmailInputOnChangeText} maxLength={EmailValidator.maxLength} placeholder='Email' size='$4' borderWidth={1}/>
                                <XStack gap='$3'>
                                    <Input value={mainStore.authLogInForm?.password} secureTextEntry={!mainStore.authLogInForm?.showPassword} disabled={mainStore.applicationGlobals?.isDisabled} onChangeText={handlePasswordInputOnChangeText} maxLength={PasswordValidator.maxLength} placeholder='Password' size='$4' borderWidth={1} width='76%'/>
                                    <Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleShowPasswordInputOnPress} backgroundColor='transparent' icon={<EyeIcon isOn={mainStore.authLogInForm?.showPassword}/>}></Button>
                                </XStack>
                                <View></View>
                                <Form.Trigger asChild disabled={mainStore.applicationGlobals?.isDisabled}>
                                    <Button disabled={mainStore.applicationGlobals?.isDisabled} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.applicationGlobals?.isSubmitting) ? <Spinner color='$white2'/> : undefined}>
                                        Log In
                                    </Button>
                                </Form.Trigger>
                            </YStack>
                        </YStack>
                    </Form>
                </ScrollView>
            </YStack>
        </>
    )
}
*/
