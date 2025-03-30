import { Stack } from 'expo-router'

import('@/app/')
import('@/app/+not-found')

export default function SignUpLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
            <Stack.Screen name='index' options={{ headerShown: false, animation: 'fade' }} />
        </Stack>
    )
}

