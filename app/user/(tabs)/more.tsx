import { router } from 'expo-router'
import { ScrollView } from 'react-native'
import { Button, XStack, YStack, Paragraph, H6 } from 'tamagui'
import { Award, MessageCircleWarning, Menu, CircleUserRound, LockKeyhole, BellRing, Trophy, Palette, Info } from '@tamagui/lucide-icons'

import { CommonHeader } from '@/components/CommonHeader'

export default function UserTabsMore() {
    const handleNavigateToAccountProfileOnPress: Function = async () => {
        router.push('/user/account-profile')
    }

    const handleNavigateToAccountNewPasswordOnPress: Function = async () => {
        router.push('/user/account-new-password')
    }

    const handleNavigateToLeaderboardsOnPress: Function = async () => {
        router.push('/user/leaderboards')
    }

    const handleNavigateToAchievementsOnPress: Function = async () => {
        router.push('/user/achievements')
    }

    const handleNavigateToStylesOnPress: Function = async () => {
        router.push('/user/styles')
    }

    const handleNavigateToNotificationsOnPress: Function = async () => {
        router.push('/user/notifications')
    }

    const handleNavigateToReportOnPress: Function = async () => {
        router.push('/user/report')
    }

    const handleNavigateToAboutOnPress: Function = async () => {
        router.push('/user/about')
    }

    const cards: any[] = [
        { icon: <CircleUserRound size='$2' />, title: 'Account Profile', description: 'User Data | Log Out', onPress: handleNavigateToAccountProfileOnPress },
        { icon: <LockKeyhole size='$2' />, title: 'New Password', description: 'Update Account Password', onPress: handleNavigateToAccountNewPasswordOnPress },
        { icon: <Trophy size='$2' />, title: 'Leaderboards', description: 'Live Feed', onPress: handleNavigateToLeaderboardsOnPress },
        { icon: <Award size='$2' />, title: 'Achievements', description: 'Insights', onPress: handleNavigateToAchievementsOnPress },
        { icon: <Palette size='$2' />, title: 'Styles', description: 'Application Themes', onPress: handleNavigateToStylesOnPress },
        { icon: <MessageCircleWarning size='$2' />, title: 'Report', description: 'Messaging', onPress: handleNavigateToReportOnPress },
        { icon: <BellRing size='$2' />, title: 'Notifications', description: 'Schedules', onPress: handleNavigateToNotificationsOnPress },
        { icon: <Info size='$2' />, title: 'About', description: 'App Details | Contacts', onPress: handleNavigateToAboutOnPress },
    ]

    return (
        <>
            <CommonHeader titleProperties={{ label: 'More', icon: <Menu size='$2' /> }} descriptionProperties={{ label: 'Additional content for you' }}/>
            <YStack flex={1} alignItems='center' justifyContent='center'>
                <ScrollView width='90%'>
                    <YStack gap='$2'>
                        {cards.map((card: any, index: number) => {
                            return (
                                <Button key={index} onPress={card.onPress} paddingLeft='0' paddingRight='30' backgroundColor='$color3' height='90'>
                                    <XStack width='100%' alignItems='center' justifyContent='center'>
                                        <YStack width='30%' alignItems='center' justifyContent='center'>
                                            {card.icon}
                                        </YStack>
                                        <YStack gap='$1' width='70%'>
                                            <H6 fontWeight='bold'>{card.title}</H6>
                                            <Paragraph fontSize='$1' lineHeight='16'>{card.description}</Paragraph>
                                        </YStack>
                                    </XStack>
                                </Button>
                            )
                        })}
                    </YStack>
                </ScrollView>
            </YStack>
        </>
    )
}
