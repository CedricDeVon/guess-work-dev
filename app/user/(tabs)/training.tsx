import { useEffect } from 'react'
import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { BookOpen } from '@tamagui/lucide-icons'
import { Spinner, Button, XStack, YStack, Paragraph, H4, H6 } from 'tamagui'

import { CommonHeader } from '@/components/CommonHeader'

export default function UserTabsTraining() {
    const handleToBeSquareOnPress = async () => {

    }

    const handleBlackOrWhiteOnPress = async () => {

    }

    const handleToReachAPointOnPress = async () => {

    }

    const handleTargetAquiredOnPress = async () => {

    }

    return (
    <>
        <CommonHeader
            titleProperties={{ label: 'Training', icon: <BookOpen size='$2' /> }}
            descriptionProperties={{ label: 'Every journey begins with a single step' }}
            />
        <YStack flex={1} alignItems='center' justifyContent='center' >
            <ScrollView width='90%'>
                <YStack gap='$2'>
                    <Button onPress={handleToBeSquareOnPress} paddingLeft='0' paddingRight='30' backgroundColor='$color3' height='120'>
                        <XStack width='100%' alignItems='center' justifyContent='center'>
                            <YStack width='30%' alignItems='center' justifyContent='center'>
                                <H4 fontWeight='bold'>-</H4>
                                <Paragraph fontSize='$1'>+ 0</Paragraph>
                            </YStack>
                            <YStack gap='$1' width='70%'>
                                <H6 fontWeight='bold'>To Be Square</H6>
                                <Paragraph fontSize='$1' lineHeight='16'>Tap on the correct chess square, based on a given coordinate.</Paragraph>
                            </YStack>
                        </XStack>
                    </Button>
                    <Button onPress={handleBlackOrWhiteOnPress} paddingLeft='0' paddingRight='30' backgroundColor='$color3' height='120'>
                        <XStack width='100%' alignItems='center' justifyContent='center'>
                            <YStack width='30%' alignItems='center' justifyContent='center'>
                                <H4 fontWeight='bold'>-</H4>
                                <Paragraph fontSize='$1'>+ 0</Paragraph>
                            </YStack>
                            <YStack gap='$1' width='70%'>
                                <H6 fontWeight='bold'>Black or White?</H6>
                                <Paragraph fontSize='$1' lineHeight='16'>Identify the correct chess color, based on a given coordinate.</Paragraph>
                            </YStack>
                        </XStack>
                    </Button>
                    <Button onPress={handleToReachAPointOnPress} paddingLeft='0' paddingRight='30' backgroundColor='$color3' height='120'>
                        <XStack width='100%' alignItems='center' justifyContent='center'>
                            <YStack width='30%' alignItems='center' justifyContent='center'>
                                <H4 fontWeight='bold'>-</H4>
                                <Paragraph fontSize='$1'>+ 0</Paragraph>
                            </YStack>
                            <YStack gap='$1' width='70%'>
                                <H6 fontWeight='bold'>To Reach A Point</H6>
                                <Paragraph fontSize='$1' lineHeight='16'>Move a chess piece towards a given coordinate.</Paragraph>
                            </YStack>
                        </XStack>
                    </Button>
                    <Button onPress={handleTargetAquiredOnPress} paddingLeft='0' paddingRight='30' backgroundColor='$color3' height='120'>
                        <XStack width='100%' alignItems='center' justifyContent='center'>
                            <YStack width='30%' alignItems='center' justifyContent='center'>
                                <H4 fontWeight='bold'>-</H4>
                                <Paragraph fontSize='$1'>+ 0</Paragraph>
                            </YStack>
                            <YStack gap='$1' width='70%'>
                                <H6 fontWeight='bold'>Target Acquired</H6>
                                <Paragraph fontSize='$1' lineHeight='16'>Move towards and capture an enemy chess piece, on unoccupied squares.</Paragraph>
                            </YStack>
                        </XStack>
                    </Button>
                </YStack>
            </ScrollView>
        </YStack>
    </>
)}

/*

<Spinner color='$white2' size='48'/>
<H4 fontWeight='bold'>21</H4>
<Paragraph>+ 2</Paragraph>

*/
