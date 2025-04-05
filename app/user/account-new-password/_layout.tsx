import { Stack } from 'expo-router'

import { useDisableComponentsDuringNavigation } from '@/hooks/useDisableComponentsDuringNavigation'

import('@/app/+not-found')
import('@/app/user/(tabs)/more')

export default function UserAccountNewPasswordLayout() {
    useDisableComponentsDuringNavigation()

    return (
        <>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
                <Stack.Screen name='index' options={{ headerShown: false, animation: 'fade' }} />
            </Stack>
        </>
    )
}

