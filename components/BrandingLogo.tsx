import { useMemo } from 'react'
import { Image } from 'tamagui'

import LogoImage from '@/assets/images/branding/logo-1.png'

export function BrandingLogo(props: any) {
    const logoSize: number = props?.logoSize || 64

    const content: any = useMemo(() => {
        return <Image source={LogoImage} width={logoSize} height={logoSize}/>
    }, [])

    return (content)
}
