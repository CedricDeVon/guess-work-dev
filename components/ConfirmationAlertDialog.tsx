import { useMemo } from 'react'
import { AlertDialog, XStack, YStack } from 'tamagui'

import useMainStore from '@/store/mainStore'

export function ConfirmationAlertDialog(props: any) {
    return (
        <>
            <AlertDialog>
                <AlertDialog.Trigger asChild>
                    {props.triggerContent}
                </AlertDialog.Trigger>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay key='overlay' animation='quick' opacity={0.6} enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }}>
                    </AlertDialog.Overlay>
                    <AlertDialog.Content width='90%' bordered elevate key='content' animation={[ 'quick', { opacity: { overshootClamping: true } } ]} enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }} exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }} x={0} scale={1} opacity={1} y={0}>
                        <YStack gap='$5'>
                            <YStack gap='$3'>
                                <AlertDialog.Title>
                                    {props.titleContent}
                                </AlertDialog.Title>
                                <AlertDialog.Description>
                                    {props.descriptionContent}
                                </AlertDialog.Description>
                            </YStack>
                            <XStack gap='$3' justifyContent='center'>
                                <AlertDialog.Cancel asChild>
                                    {props.cancelContent}
                                </AlertDialog.Cancel>
                                <AlertDialog.Action asChild>
                                    {props.acceptContent}
                                </AlertDialog.Action>
                            </XStack>
                        </YStack>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog>
        </>
    )
}
