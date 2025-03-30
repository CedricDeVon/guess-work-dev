import { Image } from 'tamagui'

import Logo from '@/assets/images/branding/logo-1.png'

export function LargeApplicationLogo() {
    return (
        <Image source={Logo} width={64} height={64}/>
    )
}
