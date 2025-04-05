import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { useToastController } from '@tamagui/toast'
import { CircleUserRound } from '@tamagui/lucide-icons'
import { Avatar, Button, Input, XStack, YStack, Paragraph, Image, Checkbox, Label, Form, Spinner, H6 } from 'tamagui'
import * as FileSystem from "expo-file-system";
import * as ImagePicker from 'expo-image-picker';

import styles from '@/assets/styles/global'
import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { CommonPicker } from '@/components/CommonPicker'
import { ConfirmationAlertDialog } from '@/components/ConfirmationAlertDialog'

export default function UserAccountProfile() {
    const mainStore: any = useMainStore()
    const toast: any = useToastController()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    const handleUploadingProfilePictureOnPress: Function = async () => {
        await ImagePicker.requestMediaLibraryPermissionsAsync()

        const imagePickerResult: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: false,
            allowsEditing: true,
            quality: 1,
            exif: false,
        })

        const base64: any = await FileSystem.readAsStringAsync(imagePickerResult.assets[0].uri, {
            encoding: FileSystem.EncodingType.Base64
        })
        const buffer: any = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))
        mainStore.updateAccountProfileForm({ profilePictureUri: imagePickerResult.assets[0].uri })
    }

    const handleUsernameInputOnChangeText: Function = async (value: any) => {
        
    }

    const handleFullNameInputOnChangeText: Function = async (value: any) => {
        
    }

    const handleGenderSelectItemOnPress: Function = async (value: any) => {

    }

    const handleNationalitySelectItemOnPress: Function = async (value: any) => {

    }

    const handleBioInputOnChangeText: Function = async (value: any) => {
        
    }

    const handleSaveOnPress: Function = async () => {
        
    }

    const handleCancelContentSaveAlertDialogOnPress: Function = async () => {
        
    }

    const handleAcceptContentSaveAlertDialogOnPress: Function = async () => {
        
    }

    const handleCancelContentLogOutAlertDialogOnPress: Function = async () => {
        
    }

    const handleAcceptContentLogOutAlertDialogOnPress: Function = async () => {
        try {
            mainStore.updateApplicationGlobalsToSubmitting()

            toast.show('Success! Please Wait', { native: true })

            mainStore.updateApplicationGlobalsToUnSubmitting()
            mainStore.resetAccountProfileForm()
            mainStore.resetUserAccount()

            router.push('/')

        } catch (error: any) {
            console.log(error)
            toast.show('Something\'s Wrong. Please Try Again', { native: true })
            mainStore.updateApplicationGlobalsToUnSubmitting()
            mainStore.resetAccountProfileForm()
        }
    }

    const genderSelections: any[] = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'None', value: 'none' }
    ]

    const nationalitySelections: any[] = [
        { label: 'Philippines', value: 'PH' },
        { label: 'Global', value: 'UN' },
    ]

    return (
        <>
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }} titleProperties={{ label: 'Account Profile', icon: <CircleUserRound size='$2' /> }}/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$3'>
                        {/*
                        <Button onPress={handleUploadingProfilePictureOnPress} width={120} height={120} backgroundColor='transparent'>
                            <Image source={{ uri: mainStore.accountProfileForm?.profilePictureUri }} borderWidth='1' borderRadius={100} borderColor='red' width={100} height={100} resizeMode="fit" />
                        </Button>*/}
                        <Input value={mainStore.accountProfileForm?.username} disabled={mainStore.applicationGlobals?.isDisabled} onChangeText={handleUsernameInputOnChangeText} placeholder='Username' keyboardType='text' size='$4' borderWidth={1} maxLength={100}/>
                        <Input value={mainStore.accountProfileForm?.fullName} disabled={mainStore.applicationGlobals?.isDisabled} onChangeText={handleFullNameInputOnChangeText} placeholder='Full Name' keyboardType='text' size='$4' borderWidth={1} maxLength={100}/>
                        <Input value={mainStore.accountProfileForm?.bio} disabled={mainStore.applicationGlobals?.isDisabled} onChangeText={handleBioInputOnChangeText} placeholder='Bio' multiline textAlignVertical="top" numberOfLines={5} keyboardType='text' size='$4' borderWidth={1} maxLength={100}/>
                        <CommonPicker value={mainStore.accountProfileForm?.selectedGender?.value} selections={genderSelections} onPressSelectModalItem={handleGenderSelectItemOnPress} title='Gender'/>
                        <CommonPicker value={mainStore.accountProfileForm?.selectedNationality?.value} selections={nationalitySelections} onPressSelectModalItem={handleNationalitySelectItemOnPress} title='Nationality'/>
                        <ConfirmationAlertDialog
                            triggerContent={(<Button disabled={mainStore.applicationGlobals?.isDisabled} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }}>Save</Button>)}
                            titleContent={<H6 textAlign='center'>Confirmation</H6>}
                            descriptionContent={<Paragraph textAlign='center'>Are you sure?</Paragraph>}
                            cancelContent={(<Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleCancelContentSaveAlertDialogOnPress}>Cancel</Button>)}
                            acceptContent={(<Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleAcceptContentSaveAlertDialogOnPress} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.applicationGlobals?.isSubmitting) ? <Spinner color='$white2' /> : undefined}>Accept</Button>)}
                        />
                        <ConfirmationAlertDialog
                            triggerContent={(<Button disabled={mainStore.applicationGlobals?.isDisabled} borderWidth='$0' color='$white2' backgroundColor='$red9' pressStyle={{ backgroundColor: '$red8' }}>Log Out</Button>)}
                            titleContent={<H6 textAlign='center'>Confirmation</H6>}
                            descriptionContent={<Paragraph textAlign='center'>Are you sure?</Paragraph>}
                            cancelContent={(<Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleCancelContentLogOutAlertDialogOnPress}>Cancel</Button>)}
                            acceptContent={(<Button disabled={mainStore.applicationGlobals?.isDisabled} onPress={handleAcceptContentLogOutAlertDialogOnPress} borderWidth='$0' color='$white2' backgroundColor='$blue9' pressStyle={{ backgroundColor: '$blue8' }} icon={(mainStore.applicationGlobals?.isSubmitting) ? <Spinner color='$white2' /> : undefined}>Accept</Button>)}
                        />
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}
