import { Stack } from 'expo-router'

import { useDisableComponentsDuringNavigation } from '@/hooks/useDisableComponentsDuringNavigation'

import('@/app/+not-found')
import('@/app/user/(tabs)/more')

export default function UserAchievementsLayout() {
    useDisableComponentsDuringNavigation()
    
    return (
        <>
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name='index' options={{ headerShown: false, animation: 'fade' }} />
            </Stack>
        </>
    )
}

