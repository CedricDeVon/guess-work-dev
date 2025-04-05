import { Spinner } from 'tamagui'

export function LoadingSpinnerIcon(props: any) {
    const propsIsEnabled: bool = props.isEnabled
    const propsIconSize: string = props.iconSize || '$1'
    const propsIconColor: string = props.iconColor || '$white2'

    return (
        (propsIsEnabled) ? <Spinner size={propsIconSize} color={propsIconColor}/> : undefined
    )
}
