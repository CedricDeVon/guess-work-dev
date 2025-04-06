import { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { router, Link } from 'expo-router'
import { Form, View, Input, Spinner, Button, Separator, Switch, Label, XStack, YStack, Paragraph, H6 } from 'tamagui'
import { Menu, CircleUserRound, LockKeyhole, BellRing, Trophy, Palette, Info } from '@tamagui/lucide-icons'
import { useToastController } from '@tamagui/toast'
import * as ImagePicker from 'expo-image-picker'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker'

import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { CommonPicker } from '@/components/CommonPicker'

export default function UserNotifications() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handleNavigateToHelpOnPress: Function = async () => {
        
    }

    const handleTimeInHoursSelectItemOnPress: Function = async (value: any) => {
        mainStore.updateNotificationsForm({ selectedTimeInHours: value })
        toast.show('Updated', { native: true })
    }

    const handleTimeInMinutesSelectItemOnPress: Function = async (value: any) => {
        mainStore.updateNotificationsForm({ selectedTimeInMinutes: value })
        toast.show('Updated', { native: true })
    }
    
    const handleTimeOfDaySelectItemOnPress: Function = async (value: any) => {
        mainStore.updateNotificationsForm({ selectedTimeOfDay: value })
        toast.show('Updated', { native: true })
    }

    const handleContentTitleOnChangeText: Function = async (value: any) => {
        mainStore.updateNotificationsForm({ contentTitle: value })
    }

    const handleContentMessageOnChangeText: Function = async (value: any) => {
        mainStore.updateNotificationsForm({ contentMessage: value })
    }

    const handleIsDisabledOnCheckedChange: Function = async (value: any) => {
        mainStore.updateNotificationsForm({ isNotificationDisabled: value })
    }

    const handleSaveOnPress: Function = async () => {
        try {
            mainStore.updateNotificationsForm({ isSubmitting: true, isDisabled: true })

            toast.show('Success', { native: true })

            mainStore.updateNotificationsForm({ isSubmitting: false, isDisabled: false })

        } catch (error: any) {
            // console.log(error)
            toast.show('Unexpected Behavior Detected', { native: true })
            mainStore.updateNotificationsForm({ isSubmitting: false, isDisabled: false })
        }
    }

    let temporaryIndex: number = 0
    const timeInHoursSelections: any[] = []
    for (temporaryIndex = 1; temporaryIndex < 13; ++temporaryIndex) {
        timeInHoursSelections.push({ label: `${temporaryIndex}`, value: temporaryIndex })
    }
    
    const timeInMinutesSelections: any[] = []
    for (temporaryIndex = 0; temporaryIndex < 61; temporaryIndex += 5) {
        timeInMinutesSelections.push({ label: (temporaryIndex < 10) ? `0${temporaryIndex}` : `${temporaryIndex}`, value: temporaryIndex })
    }

    const timeOfDaySelections: any[] = [
        { label: 'AM', value: 'am' },
        { label: 'PM', value: 'pm' }
    ]

    return (
        <>
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }} titleProperties={{ label: 'Notifications', icon: <BellRing size='$2' /> }} rightEdgeButtonProperties={{ callback: handleNavigateToHelpOnPress }}/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$5'>
                        <XStack gap='$3' justifyContent='space-between' alignItems='center'>
                            <Paragraph>Time</Paragraph>
                            <XStack justifyContent='center' gap='$1'>
                                <CommonPicker value={mainStore.notificationsForm?.selectedTimeInHours?.value} selections={timeInHoursSelections} onPressSelectModalItem={handleTimeInHoursSelectItemOnPress} title='Hours'/>
                                <CommonPicker value={mainStore.notificationsForm?.selectedTimeInMinutes?.value} selections={timeInMinutesSelections} onPressSelectModalItem={handleTimeInMinutesSelectItemOnPress} title='Minutes'/>
                                <CommonPicker value={mainStore.notificationsForm?.selectedTimeOfDay?.value} selections={timeOfDaySelections} onPressSelectModalItem={handleTimeOfDaySelectItemOnPress} title='Time of Day'/>
                            </XStack>
                        </XStack>
                        <YStack gap='$3'>
                            <Paragraph>Content</Paragraph>
                            <Input value={mainStore.notificationsForm?.contentTitle} disabled={mainStore.notificationsForm?.isDisabled} onChangeText={handleContentTitleOnChangeText} placeholder='Title' keyboardType='text' size='$4' borderWidth={1} maxLength={100}/>
                            <Input value={mainStore.notificationsForm?.contentMessage} disabled={mainStore.notificationsForm?.isDisabled} onChangeText={handleContentMessageOnChangeText} placeholder='Message' multiline textAlignVertical='top' numberOfLines={5} keyboardType='text' size='$4' borderWidth={1} maxLength={100}/>
                        </YStack>
                        <YStack gap='$3'>
                            <XStack justifyContent='space-between' alignItems='center'>
                                <Label>Is Disabled</Label>
                                <Switch checked={mainStore.notificationsForm?.isNotificationDisabled} disabled={mainStore.notificationsForm?.isDisabled} onCheckedChange={handleIsDisabledOnCheckedChange} size='$3'>
                                    <Switch.Thumb animation='bouncy'/>
                                </Switch>
                            </XStack>
                        </YStack>
                        <Button disabled={mainStore.notificationsForm?.isDisabled} onPress={handleSaveOnPress} color='$white2' borderWidth='$0' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.notificationsForm?.isSubmitting) ? () => <Spinner color='$white2' /> : undefined}>
                            Save
                        </Button>
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}
