import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { Palette } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { Button, YStack, XStack, Paragraph, H6 } from 'tamagui'

import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { CommonPicker } from '@/components/CommonPicker'
import { ConfirmationAlertDialog } from '@/components/ConfirmationAlertDialog'
import { appplicationThemeSelections, defaultConstants } from '@/utils/defaultConstants'

import { SupabaseAPI } from '@/library/apis/supabaseApi'

export default function UserStyles() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handleSelectItemOnPress: Function = async (item: any) => {
        mainStore.updateApplicationGlobalsToSubmitting()

        const userMetaData: any = mainStore.extractUserData(mainStore.userAccount).metadata
        userMetaData.styles.theme = item.value
        
        SupabaseAPI.singleton.updateOne(
            'user',
            { email: mainStore.extractUserData(mainStore.userAccount).email }, {
                data: {
                    metadata: userMetaData
                }
            }
        ).then((response: any) => {
            if (!response.isSuccessful) {
                toast.show('Something\'s Wrong. Please Try Again', { native: true })
                mainStore.updateApplicationGlobalsToUnSubmitting()
                return
            }

            mainStore.updateUserAccount({ userData: response.data[0] })
        })

        toast.show('Updated', { native: true })
        mainStore.updateCurrentStyleTheme(item.value)
        mainStore.updateApplicationGlobalsToUnSubmitting()
    }

    const handleCancelContentAlertDialogOnPress: Function = async () => {
        
    }

    const handleAcceptContentAlertDialogOnPress: Function = async () => {
        try {
            mainStore.updateApplicationGlobalsToSubmitting()

            const userMetaData: any = mainStore.extractUserData(mainStore.userAccount).metadata
            userMetaData.styles.theme = defaultConstants.APPLICATION_THEME

            SupabaseAPI.singleton.updateOne(
                'user',
                { email: mainStore.extractUserData(mainStore.userAccount).email }, {
                    data: {
                        metadata: userMetaData
                    }
                }
            ).then((response: any) => {
                if (!response.isSuccessful) {
                    toast.show('Something\'s Wrong. Please Try Again', { native: true })
                    mainStore.updateApplicationGlobalsToUnSubmitting()
                    return
                }

                mainStore.updateUserAccount({ userData: response.data[0] })
            })

            toast.show('Reset To Default', { native: true })
            mainStore.updateCurrentStyleTheme(defaultConstants.APPLICATION_THEME)
            mainStore.updateApplicationGlobalsToUnSubmitting()

        } catch (error: any) {
            toast.show('Unexpected Behavior Detected', { native: true })
            mainStore.resetStylesSettings()
        }
    }

    return (
        <>
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }} titleProperties={{ label: 'Styles', icon: <Palette size='$2' /> }}/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$3'>                   
                        <XStack justifyContent='space-between' alignItems='center'>
                            <Paragraph>App Theme</Paragraph>
                            <CommonPicker value={mainStore.currentStyleTheme} selections={appplicationThemeSelections} onPressSelectModalItem={handleSelectItemOnPress} title='App Theme'/>
                        </XStack>
                        <ConfirmationAlertDialog
                            triggerContent={(<Button color='$white2' backgroundColor='$red9' pressStyle={{ borderWidth: '$0', backgroundColor: '$red8' }} icon={(mainStore.stylesSettings?.isSubmitting) ? () => <Spinner color='$white2' /> : undefined}>Reset To Default</Button>)}
                            titleContent={<H6 textAlign='center'>Confirmation</H6>}
                            descriptionContent={<Paragraph textAlign='center'>Are you sure?</Paragraph>}
                            cancelContent={(<Button disabled={mainStore.stylesSettings?.isDisabled} onPress={handleCancelContentAlertDialogOnPress}>Cancel</Button>)}
                            acceptContent={(<Button disabled={mainStore.stylesSettings?.isDisabled} onPress={handleAcceptContentAlertDialogOnPress} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.stylesSettings?.isSubmitting) ? () => <Spinner color='$white2' /> : undefined}>Accept</Button>)}
                        />
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}
