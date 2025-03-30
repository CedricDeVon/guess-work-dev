import { useState } from 'react'
import Modal from 'react-native-modal'
import { FlatList } from 'react-native'
import { View, Button, YStack, XStack, H6 } from 'tamagui'
import { Check, ChevronUp, ChevronDown } from '@tamagui/lucide-icons'

export function CommonPicker(props: any) {
    const [isVisible, setVisible] = useState(false)
    const selections: any[] = props.selections || []
    const selectedItem: any = selections.find((item: any) => {
        return item.value === props.value
    }) || { label: '', value: '' }

    const handleShowModalOnPress: Function = async () => {
        props.onPressShowModal && props.onPressShowModal()
        setVisible(true)
    }

    const handleCloseModalOnPress: Function = async () => {
        props.onPressCloseModal && props.onPressCloseModal()
        setVisible(false)
    }

    const handleSelectItemOnPress: Function = async (item: any) => {
        props.onPressSelectModalItem && props.onPressSelectModalItem(item)
        setVisible(false)
    }

    return (
        <>
            <View>
                <Button onPress={handleShowModalOnPress}>
                    {selectedItem.label}
                    {(isVisible) ? <ChevronDown size='$1' /> : <ChevronUp size='$1' />}
                </Button>                
                <Modal backdropOpacity={isVisible ? 0.9 : 0} style={{ opacity: isVisible ? 1 : 0 }} isVisible={isVisible} onBackdropPress={handleCloseModalOnPress} animationIn='fadeIn' animationOut='fadeOut'  animationInTiming={160} animationOutTiming={160} useNativeDriver={true} useNativeDriverForBackdrop={true} hideModalContentWhileAnimating={true} backdropTransitionOutTiming={0}>
                    <View borderRadius='$4' borderWidth='$1' borderColor='$color3' backgroundColor='$color1' height='40%' alignItems='center'>
                        <View borderWidth='$0' height='10' width='100%'></View>
                        <YStack width='100%'>
                            <H6 textAlign='center'>{props.title}</H6>
                            <View borderWidth='$0' height='10' width='100%'></View>
                        </YStack>
                        <View width='100%' height='1' backgroundColor='$color3'></View>
                        <FlatList width='100%' data={selections} keyExtractor={(item: any, index: number) => index} renderItem={({ item }) => (
                            <YStack>
                                <XStack gap='$3'>
                                    <Button width='100%' borderRadius='$0' backgroundColor='$color1' pressStyle={{ borderWidth: '$1', borderColor: '$blue9', backgroundColor: '$blue9' }} onPress={() => handleSelectItemOnPress(item)}>
                                        {(item.leftIcon) ? item.leftIcon : <View></View>}
                                        {item.label}
                                        {(selectedItem.value === item.value) ? <Check size='$1'/> : <View></View>}
                                    </Button>
                                </XStack>
                            </YStack>
                        )}/>
                    </View>
                </Modal>
            </View>
        </>
    )
}
