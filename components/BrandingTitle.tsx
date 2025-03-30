import { useMemo } from 'react'
import { H1, XStack, YStack } from 'tamagui'

import { BrandingLogo } from './BrandingLogo'

export function BrandingTitle(props: any) {
    const textLabel: string = props?.textLabel || 'KnightVision'
    const logoSize: number = props?.logoSize

    const content: any = useMemo(() => {
        return (
            <YStack alignItems='center' width={200} gap='$2'>
                <XStack justifyContent='center' alignItems='center'>
                    <BrandingLogo logoSize={logoSize}/>
                    <H1 size='$7'>{textLabel}</H1>
                </XStack>
            </YStack>
        ) 
    }, [])

    return (content)
}
