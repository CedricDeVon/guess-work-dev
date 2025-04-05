import { Stack } from 'expo-router'

export default function UserLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
        </>
    )
}

/*
<Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
    <Stack.Screen name='(tabs)' options={{ headerShown: false, animation: 'fade' }} />
    <Stack.Screen name='about' options={{ headerShown: false, animation: 'fade' }} />
    <Stack.Screen name='account-new-password' options={{ headerShown: false, animation: 'fade' }} />
    <Stack.Screen name='account-profile' options={{ headerShown: false, animation: 'fade' }} />
    <Stack.Screen name='achievements' options={{ headerShown: false, animation: 'fade' }} />
    <Stack.Screen name='leaderboards' options={{ headerShown: false, animation: 'fade' }} />
    <Stack.Screen name='notifications' options={{ headerShown: false, animation: 'fade' }} />
    <Stack.Screen name='styles' options={{ headerShown: false, animation: 'fade' }} />
</Stack>
*/