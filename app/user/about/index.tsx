import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { Info } from '@tamagui/lucide-icons'
import { YStack, XStack, Paragraph } from 'tamagui'

import useMainStore from '@/store/mainStore'
import { CommonHeader } from '@/components/CommonHeader'
import { BrandingFooter } from '@/components/BrandingFooter'

export default function UserAbout() {
    const mainStore: any = useMainStore()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }
    
    return (
        <>
            <CommonHeader leftEdgeButtonProperties={{ callback: handleGoBackOnPress }} titleProperties={{ label: 'About', icon: <Info size='$2' /> }}/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$3'>
                        <XStack justifyContent='space-between'>
                            <Paragraph>App Version</Paragraph>
                            <Paragraph>{mainStore.applicationVersion}</Paragraph>
                        </XStack>
                    </YStack>
                </ScrollView>
            </YStack>
            <BrandingFooter />
        </>
    )
}
