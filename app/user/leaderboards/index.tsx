import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { Trophy } from '@tamagui/lucide-icons'
import { YStack, XStack, Paragraph } from 'tamagui'

import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { BrandingFooter } from '@/components/BrandingFooter'

export default function UserLeaderboards() {
    const mainStore: any = useMainStore()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }
    
    return (
        <>
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }} titleProperties={{ label: 'Leaderboards', icon: <Trophy size='$2' /> }}/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$3'>
                    </YStack>
                </ScrollView>
            </YStack>
            <BrandingFooter />
        </>
    )
}
