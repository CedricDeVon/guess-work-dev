import { router } from 'expo-router'
import { Button, YStack, Paragraph, View } from 'tamagui'

import { CommonHeader } from '@/components/CommonHeader'
import { BrandingTitle } from '@/components/BrandingTitle'
import { useDisableComponentsDuringNavigation } from '@/hooks/useDisableComponentsDuringNavigation'

import useMainStore from '@/store/mainStore'

export default function NotFoundScreen() {
    const mainStore: any = useMainStore()

    const handleGoBackOnPress: Function = async () => {
        router.back()
    }

    useDisableComponentsDuringNavigation()

    return (
        <>
            <CommonHeader goBackButtonProperties={{ callback: handleGoBackOnPress }} showThemeButton />
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <YStack gap='$7' alignItems='center' justifyContent='center'>
                    <YStack gap='$3'>
                        <BrandingTitle textLabel='Dead End!'/>
                        <YStack width={250}>
                            <Paragraph textAlign='center'>What you're looking for may not yet exist. Our appologies.</Paragraph>
                        </YStack>
                    </YStack>
                    <YStack width={200}>
                        <Button onPress={handleGoBackOnPress}>
                            Go Back
                        </Button>
                    </YStack>
                </YStack>
                <View height='100'></View>
            </YStack>
        </>
    )
}
