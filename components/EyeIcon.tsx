import { useMemo } from 'react'
import { Eye, EyeOff } from '@tamagui/lucide-icons'

import useMainStore from '@/store/mainStore'

export function EyeIcon(props: any) {
    const mainStore: any = useMainStore()
    
    const propsIsOn: bool = props.isOn
    const propsIconSize: string = props.iconSize || '$1'
    const propsIconColor: string = props.iconColor || (mainStore.currentStyleTheme === 'dark') ? '$white2' : '$black10'

    return (
        <>
            {(propsIsOn) ? <Eye size={propsIconSize} color={propsIconColor}/> : <EyeOff size={propsIconSize} color={propsIconColor}/>}
        </>
    )
}
