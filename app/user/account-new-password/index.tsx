import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { useToastController } from '@tamagui/toast'
import { LockKeyhole, Eye, EyeOff } from '@tamagui/lucide-icons'
import { Button, XStack, YStack, Input, Spinner, H6, Paragraph } from 'tamagui'

import styles from '@/assets/styles/global'
import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { ConfirmationAlertDialog } from '@/components/ConfirmationAlertDialog'

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
            mainStore.updateAccountNewPasswordForm({ isSubmitting: true, isDisabled: true })

            toast.show('Password Updated', { native: true })

            router.push('/')

            mainStore.resetAccountNewPasswordForm()

        } catch (error: any) {
            console.log(error)
            toast.show('Unexpected Behavior Detected.', { native: true })
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
                                    <Input value={mainStore.accountNewPasswordForm?.password} disabled={mainStore.accountNewPasswordForm?.isDisabled} secureTextEntry={!mainStore.accountNewPasswordForm?.showPassword} onChangeText={handlePasswordInputOnChangeText} placeholder='New Password' size='$4' borderWidth={1} width='80%' />
                                    <Button disabled={mainStore.accountNewPasswordForm?.isDisabled} onPress={handleShowPasswordInputOnPress} style={styles.buttonDefault1} icon={(mainStore.accountNewPasswordForm?.showPassword) ? () => <EyeOff size='$1' /> : <Eye size='$1' />}></Button>
                                </XStack>
                                <Input value={mainStore.accountNewPasswordForm?.confirmPassword} secureTextEntry={!mainStore.accountNewPasswordForm?.showPassword}  disabled={mainStore.accountNewPasswordForm?.isDisabled} onChangeText={handleConfirmPasswordInputOnChangeText} placeholder='Confirm Password' size='$4' borderWidth={1} />
                            </YStack>
                        </YStack>
                        <ConfirmationAlertDialog
                            triggerContent={(<Button disabled={mainStore.accountNewPasswordForm?.isDisabled} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }}>Update</Button>)}
                            titleContent={<H6 textAlign='center'>Confirmation</H6>}
                            descriptionContent={<Paragraph textAlign='center'>Are you sure? You will need to log-in again.</Paragraph>}
                            cancelContent={(<Button disabled={mainStore.accountNewPasswordForm?.isDisabled} onPress={handleCancelContentAlertDialogOnPress}>Cancel</Button>)}
                            acceptContent={(<Button disabled={mainStore.accountNewPasswordForm?.isDisabled} onPress={handleAcceptContentAlertDialogOnPress} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.accountNewPasswordForm?.isSubmitting) ? () => <Spinner color='$white2' /> : undefined}>Accept</Button>)}
                        />
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}
