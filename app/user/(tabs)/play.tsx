import { YStack } from 'tamagui'
import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { Swords } from '@tamagui/lucide-icons'

import { CommonHeader } from '@/components/CommonHeader'

export default function UserTabsPlay() {
    const handleHelpOnPress: Function = async () => {

    }

    return (
        <>
            <CommonHeader titleProperties={{ label: 'Play', icon: <Swords size='$2' /> }} descriptionProperties={{ label: 'Challenge with a friend or bot' }} rightEdgeButtonProperties={{ callback: handleHelpOnPress }} />
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$2'>
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}
