import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { Palette } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import { Button, YStack, XStack, Paragraph, H6 } from 'tamagui'

import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { CommonPicker } from '@/components/CommonPicker'
import { ConfirmationAlertDialog } from '@/components/ConfirmationAlertDialog'

export default function UserStyles() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handleSelectItemOnPress: Function = async (item: any) => {
        mainStore.updateCurrentStyleTheme(item.value)
        toast.show('Updated', { native: true })
    }

    const handleCancelContentAlertDialogOnPress: Function = async () => {
        
    }

    const handleAcceptContentAlertDialogOnPress: Function = async () => {
        try {
            mainStore.updateStylesSettings({ isSubmitting: true, isDisabled: true })

            // console.log(mainStore.stylesSettings)

            toast.show('Reset To Default', { native: true })
            mainStore.updateCurrentStyleTheme('dark')
            mainStore.resetStylesSettings()

        } catch (error: any) {
            // console.log(error)
            toast.show('Unexpected Behavior Detected', { native: true })
            mainStore.resetStylesSettings()
        }
    }

    const appThemeSelections: any = [
        { label: 'Dark Theme', value: 'dark' },
        { label: 'Light Theme', value: 'light' }
    ]

    return (
        <>
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }} titleProperties={{ label: 'Styles', icon: <Palette size='$2' /> }}/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$3'>                   
                        <XStack justifyContent='space-between' alignItems='center'>
                            <Paragraph>App Theme</Paragraph>
                            <CommonPicker value={mainStore.currentStyleTheme} selections={appThemeSelections} onPressSelectModalItem={handleSelectItemOnPress} title='App Theme'/>
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
