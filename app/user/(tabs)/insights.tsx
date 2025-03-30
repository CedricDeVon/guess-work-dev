import { YStack } from 'tamagui'
import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { ChartColumnIncreasing } from '@tamagui/lucide-icons'

import { CommonHeader } from '@/components/CommonHeader'

export default function UserTabsInsights() {
    const handleHelpOnPress: Function = async () => {

    }

    return (
        <>
            <CommonHeader titleProperties={{ label: 'Insights', icon: <ChartColumnIncreasing size='$2' /> }} descriptionProperties={{ label: 'Look how far you’ve come!' }} rightEdgeButtonProperties={{ callback: handleHelpOnPress }} />
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$2'>
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}
