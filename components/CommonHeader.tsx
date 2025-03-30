import { useMemo } from 'react'
import { View } from 'react-native'
import { Button, XStack, YStack, Paragraph, Image, H6 } from 'tamagui'
import { Sun, Moon, ArrowLeft, CircleHelp } from '@tamagui/lucide-icons'

import Logo from '@/assets/images/logos-main/png/snack.png'

import styles from '@/assets/styles/global'
import useMainStore from '@/store/mainStore'

export function CommonHeader(props: any) {
    const mainStore: any = useMainStore()
    
    const commonIconSize: any = props?.commonIconSize || '$1'
    const leftEdgeButtonProperties: any = props?.leftEdgeButtonProperties
    const titleProperties: any = props?.titleProperties
    const descriptionProperties: any = props?.descriptionProperties
    const showThemeChangeButton: any = props?.showThemeChangeButton
    const rightEdgeButtonProperties: any = props?.rightEdgeButtonProperties

    const content: any = useMemo(() => {
        return (
            <YStack alignItems='center' gap='$2' justifyContent='start' height={90}>
                <XStack height='40' width='90%' alignItems='center' justifyContent='space-between'>
                    <XStack width='10%' alignItems='center' justifyContent='center'>
                    {
                        leftEdgeButtonProperties ?
                        (<>
                            <Button
                                icon={leftEdgeButtonProperties.icon || <ArrowLeft size={commonIconSize}/>}
                                onPress={leftEdgeButtonProperties.callback || (() => {})}
                                style={styles.commonHeaderItem1}>
                            </Button>
                        </>) :
                        (<>
                        </>)
                    }
                    </XStack>
                    <XStack width='70%' gap='$2' alignItems='center' justifyContent='center'>
                    {
                        titleProperties ? 
                        (<>
                            {titleProperties.icon}
                            <H6>{titleProperties.label}</H6>
                        </>) :
                        (<>
                        </>)
                    }
                    </XStack>
                    <XStack width='10%' alignItems='center' justifyContent='center'>
                    {
                        showThemeChangeButton ?
                        (<>
                            <Button
                                icon={(mainStore.currentStyleTheme === 'dark') ? <Moon size={commonIconSize}/> : <Sun size={commonIconSize}/>}
                                onPress={mainStore.changeCurrentStyleTheme}
                                style={styles.commonHeaderItem1}>
                            </Button>
                        </>) :
                        rightEdgeButtonProperties ?
                        (<>
                            <Button
                                icon={rightEdgeButtonProperties.icon || <CircleHelp size={commonIconSize}/>}
                                onPress={rightEdgeButtonProperties.callback || (() => {})}
                                style={styles.commonHeaderItem1}>
                            </Button>
                        </>) :
                        (<></>)
                    }
                    </XStack>
                </XStack>
                <Paragraph size='$1'>
                {descriptionProperties?.label}
                </Paragraph>
            </YStack>
        )
    })

    return (content)
}
