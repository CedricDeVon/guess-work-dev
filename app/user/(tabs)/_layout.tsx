import { Tabs } from 'expo-router'
import { BookOpen, ChartColumnIncreasing, Menu, Swords } from '@tamagui/lucide-icons'

import styles from '@/assets/styles/global'
import useMainStore from '@/store/mainStore'
import { usePreventBackPress } from '@/hooks/usePreventBackPress'

import('@/app/+not-found')
import('@/app/user/(tabs)/play')
import('@/app/user/(tabs)/more')
import('@/app/user/(tabs)/training')
import('@/app/user/(tabs)/insights')

export default function UserTabsLayout() {
    const mainStore: any = useMainStore()

    usePreventBackPress()

    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    animation: 'fade',
                    headerShadowVisible: false,
                    tabBarInactiveTintColor: styles.tabActiveColor(mainStore.currentStyleTheme),
                    tabBarStyle: { elevation: 0, borderTopWidth: 0, backgroundColor: styles.tabInactiveColor(mainStore.currentStyleTheme),
                    height: 60
                }}
            }>
                <Tabs.Screen name='training' options={{ tabBarIcon: ({ color, focused }) => (<BookOpen color={(focused) ? '$blue9' : styles.tabActiveColor(mainStore.currentStyleTheme)} size='$1' />), title: 'Training', headerShown: false, animation: 'fade' }} />
                <Tabs.Screen name='play' options={{ tabBarIcon: ({ color, focused }) => (<Swords color={(focused) ? '$blue9' : styles.tabActiveColor(mainStore.currentStyleTheme)} size='$1' />), title: 'Play', headerShown: false, animation: 'fade' }} />
                <Tabs.Screen name='insights' options={{ tabBarIcon: ({ color, focused }) => (<ChartColumnIncreasing color={(focused) ? '$blue9' : styles.tabActiveColor(mainStore.currentStyleTheme)} size='$1' />), title: 'Insights', headerShown: false, animation: 'fade' }} />
                <Tabs.Screen name='more' options={{ tabBarIcon: ({ color, focused }) => (<Menu color={(focused) ? '$blue9' : styles.tabActiveColor(mainStore.currentStyleTheme)} size='$1' />), title: 'More', headerShown: false, animation: 'fade' }} />
            </Tabs>
        </>
    )
}

