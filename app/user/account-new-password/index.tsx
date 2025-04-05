import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { useToastController } from '@tamagui/toast'
import { LockKeyhole } from '@tamagui/lucide-icons'
import { Button, XStack, YStack, Input, Spinner, H6, Paragraph } from 'tamagui'

import styles from '@/assets/styles/global'
import useMainStore from '@/store/mainStore'
import { EyeIcon } from '@/components/EyeIcon'
import { CommonHeader } from '@/components/CommonHeader'
import { ConfirmationAlertDialog } from '@/components/ConfirmationAlertDialog'

import { SupabaseAPI } from '@/library/apis/supabaseApi'
import { PasswordValidator } from '@/library/validators/passwordValidator'
import { ConfirmPasswordValidator } from '@/library/validators/confirmPasswordValidator'

export default function UserAccountNewPassword() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handlePasswordInputOnChangeText: Function = async (value: any) => {
        mainStore.updateAccountNewPasswordForm({ password: value })
    }

    const handleShowPasswordInputOnPress: Function = async () => {
        mainStore.updateAccountNewPasswordForm({ showPassword: !mainStore.accountNewPasswordForm?.showPassword })
    }

    const handleConfirmPasswordInputOnChangeText: Function = async (value: any) => {
        mainStore.updateAccountNewPasswordForm({ confirmPassword: value })
    }

    const handleCancelContentAlertDialogOnPress: Function = async () => {
        
    }

    const handleAcceptContentAlertDialogOnPress: Function = async () => {
        try {
            mainStore.updateApplicationGlobalsToSubmitting()

            let currentResult: any = await PasswordValidator.singleton.validate(
                mainStore.accountNewPasswordForm?.password)
            if (!currentResult.isSuccessful) {
                toast.show(currentResult.error, { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            currentResult = await ConfirmPasswordValidator.singleton.validate({
                password: mainStore.accountNewPasswordForm?.password, 
                confirmPassword: mainStore.accountNewPasswordForm?.confirmPassword
            })
            if (!currentResult.isSuccessful) {
                toast.show(currentResult.error, { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            currentResult = await SupabaseAPI.singleton.updateUser(
                { password: mainStore.accountNewPasswordForm?.password }
            )
            if (!currentResult.isSuccessful) {
                toast.show(currentResult.error.message, { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }
            currentResult = await SupabaseAPI.singleton.logOutUser()
            if (!currentResult.isSuccessful) {
                toast.show('Something\'s Wrong. Please Try Again', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }

            toast.show('Success! Please Wait', { native: true })
            mainStore.updateApplicationGlobalsToUnSubmitting()
            mainStore.resetAccountNewPasswordForm()
            mainStore.resetUserAccount()

            router.push('/')

        } catch (error: any) {
            console.log(error)
            toast.show('Something\'s Wrong. Please Try Again', { native: true })
            mainStore.updateApplicationGlobalsToUnSubmitting()
            mainStore.resetAccountNewPasswordForm()
        }
    }

    return (
        <>
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }} titleProperties={{ label: 'New Password', icon: <LockKeyhole size='$2' /> }}/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$5' justifyContent='center'>
                        <YStack gap='$5' justifyContent='center'>
                            <YStack gap='$3'>
                                <XStack gap='$3'>
                                    <Input value={mainStore.accountNewPasswordForm?.password} disabled={mainStore.applicationGlobals?.isDisabled} secureTextEntry={!mainStore.accountNewPasswordForm?.showPassword} onChangeText={handlePasswordInputOnChangeText} maxLength={PasswordValidator.maxLength} placeholder='New Password' size='$4' borderWidth={1} width='80%' />
                                    <Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleShowPasswordInputOnPress} style={styles.buttonDefault1} icon={<EyeIcon isOn={mainStore.accountNewPasswordForm?.showPassword}/>}></Button>
                                </XStack>
                                <Input value={mainStore.accountNewPasswordForm?.confirmPassword} secureTextEntry={!mainStore.accountNewPasswordForm?.showPassword}  disabled={mainStore.applicationGlobals?.isDisabled} onChangeText={handleConfirmPasswordInputOnChangeText} maxLength={PasswordValidator.maxLength} placeholder='Confirm Password' size='$4' borderWidth={1} />
                            </YStack>
                        </YStack>
                        <ConfirmationAlertDialog
                            triggerContent={(<Button disabled={mainStore.applicationGlobals?.isDisabled} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }}>Update</Button>)}
                            titleContent={<H6 textAlign='center'>Confirmation</H6>}
                            descriptionContent={<Paragraph textAlign='center'>Are you sure? You will need to log-in again.</Paragraph>}
                            cancelContent={(<Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleCancelContentAlertDialogOnPress}>Cancel</Button>)}
                            acceptContent={(<Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleAcceptContentAlertDialogOnPress} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.applicationGlobals?.isSubmitting) ? <Spinner color='$white2'/> : undefined}>Accept</Button>)}
                        />
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}
