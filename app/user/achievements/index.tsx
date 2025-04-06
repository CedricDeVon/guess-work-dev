import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { router, Link } from 'expo-router'
import { useToastController } from '@tamagui/toast'
import { View, Button, Progress, XStack, YStack, Paragraph, H6, H4 } from 'tamagui'
import { Menu, CircleUserRound, LockKeyhole, BellRing, Award, Palette, Info } from '@tamagui/lucide-icons'

import styles from '@/assets/styles/global'
import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { ConfirmationAlertDialog } from '@/components/ConfirmationAlertDialog'

export default function UserAchievements() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handleNavigateToHelpOnPress: Function = async () => {
        
    }

    const handleCancelContentAlertDialogOnPress: Function = async () => {
        
    }

    const handleAcceptContentAlertDialogOnPress: Function = async () => {
        try {
            mainStore.updateAchievementsResetProgressForm({ isSubmitting: true, isDisabled: true })

            toast.show('Successful', { native: true })

            mainStore.resetAchievementsResetProgressForm()

        } catch (error: any) {
            // console.log(error)
            toast.show('Unexpected Behavior Detected.', { native: true })
            mainStore.resetAchievementsResetProgressForm()
        }
    }

    return (
        <>
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }} titleProperties={{ label: 'Achievements', icon: <Award size='$2' /> }} rightEdgeButtonProperties={{ callback: handleNavigateToHelpOnPress }}/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$3'>
                        <YStack gap='$2'>
                            <Progress size='$1' value={0} max={100} backgroundColor='$color4'>
                                <Progress.Indicator animation="bouncy" backgroundColor='$blue9'/>
                            </Progress>
                            <Button paddingLeft='0' backgroundColor='$color3' height='160'>
                                <XStack alignItems='center'>
                                    <YStack gap='$1' width='40%' alignItems='center'>
                                        <View borderRadius='$3' width='40' backgroundColor='$color6'>
                                            <Paragraph textAlign='center' fontSize='$1'>I</Paragraph>
                                        </View>
                                        <H6 fontWeight='bold'>0</H6>
                                        <Paragraph fontSize='$1'>/ 20</Paragraph>
                                    </YStack>
                                    <YStack gap='$2' width='60%'  paddingRight='30'>
                                        <H6 fontWeight='bold' lineHeight='24'>Training Attempts</H6>
                                        <Paragraph fontSize='$1' lineHeight='16'>Attempt any type of training exercise.</Paragraph>
                                    </YStack>
                                </XStack>
                            </Button>
                        </YStack>
                        <ConfirmationAlertDialog
                            triggerContent={(<Button disabled={mainStore.achievementsResetProgressForm?.isDisabled} borderWidth='$0' color='$white2' backgroundColor='$red9' pressStyle={{ backgroundColor: '$red8' }}>Reset Progress</Button>)}
                            titleContent={<H6 textAlign='center'>Confirmation</H6>}
                            descriptionContent={<Paragraph textAlign='center'>Are you sure?</Paragraph>}
                            cancelContent={(<Button disabled={mainStore.achievementsResetProgressForm?.isDisabled} onPress={handleCancelContentAlertDialogOnPress}>Cancel</Button>)}
                            acceptContent={(<Button disabled={mainStore.achievementsResetProgressForm?.isDisabled} onPress={handleAcceptContentAlertDialogOnPress} borderWidth='$0' color='$white2' backgroundColor='$red9' pressStyle={{ backgroundColor: '$red8' }} icon={(mainStore.achievementsResetProgressForm?.isSubmitting) ? () => <Spinner color='$white2' /> : undefined}>Accept</Button>)}
                        />
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}
