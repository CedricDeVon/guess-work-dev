import { useMemo } from 'react'
import { XStack, YStack, Paragraph } from 'tamagui'

import useMainStore from '@/store/mainStore'

export function BrandingFooter(props: any) {
    const mainStore: any = useMainStore()

    const content: any = useMemo(() => {
        return (
            <YStack alignItems='center' justifyContent='center' height={100}>
                <XStack width='90%' alignItems='flex-end' justifyContent='center'>
                    <XStack gap='$2'>
                        <Paragraph color='$black9'>&copy; {mainStore.currentDateYear}</Paragraph>
                        <Paragraph color='$blue9'>KnightVision</Paragraph>
                    </XStack>
                </XStack>
            </YStack>
        )
    }, [])

    return (content)
}
