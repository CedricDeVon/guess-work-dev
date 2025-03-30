import { Stack } from 'expo-router'

import('@/app/+not-found')
import('@/app/user/(tabs)/more')

export default function UserLeaderboardsLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
                <Stack.Screen name='index' options={{ headerShown: false, animation: 'fade' }} />
            </Stack>
        </>
    )
}

