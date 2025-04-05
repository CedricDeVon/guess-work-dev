import { useMemo } from 'react'
import { Eye, EyeOff } from '@tamagui/lucide-icons'

export function EyeIcon(props: any) {
    const propsIsOn: bool = props.isOn
    const propsIconSize: string = props.iconSize || '$1'
    const propsIconColor: string = props.iconColor || '$white2'

    return (
        <>
            {(propsIsOn) ? <Eye size={propsIconSize} color={propsIconColor}/> : <EyeOff size={propsIconSize} color={propsIconColor}/>}
        </>
    )
}
