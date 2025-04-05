import { Stack } from 'expo-router'

export default function AuthLayout() {
    return (
        <>
            <Stack screenOptions={{ headerShown: false, animation: 'fade' }} />
        </>
    )
}

/*
<Stack.Screen name='log-in' options={{ headerShown: false, animation: 'fade' }} />
    <Stack.Screen name='sign-up' options={{ headerShown: false, animation: 'fade' }} />
</Stack>
*/
