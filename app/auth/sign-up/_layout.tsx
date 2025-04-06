import { Stack } from 'expo-router'

import { useDisableComponentsDuringNavigation } from '@/hooks/useDisableComponentsDuringNavigation'

import('@/app/')
import('@/app/+not-found')

export default function SignUpLayout() {
    useDisableComponentsDuringNavigation()

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' options={{ headerShown: false, animation: 'fade' }} />
        </Stack>
    )
}
