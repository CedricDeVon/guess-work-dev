import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    buttonDarkTheme1: {
        color: 'white'
    },
    buttonLightTheme1: {
        color: 'black'
    },
    buttonPressStyle1: {
        borderWidth: '$0'
    },
    buttonPressStyle2: {
        borderWidth: '$0'
    },
    buttonDefault1: {
        backgroundColor: 'transparent'
    },
    commonHeaderItem1: {
        backgroundColor: 'transparent'
    },
    pickerContainer1: {

    },
    picker1: {
        color: '#f2f2f2'
    },
    picker2: {
        color: '#000000'
    },
    pickerItem1: {
        fontSize: 14,
        color: '#000000',
    },
    pickerItem2: {
        fontSize: 14,
        color: '#f2f2f2',
    },
    dropdownIconColor1: '#f2f2f2',
    dropdownIconColor2: '#000000',
    switch1: {
        backgroundColor: '$blue9'
    },
    pickerStyles: (theme: any) => {
        if (theme === 'dark') {
            return {            
                color: '#f2f2f2'
            }

        } else if (theme === 'light') {
            return {
                color: '#000000'
            }
        }

        return '#f2f2f2'
    },
    dropdownIconColor: (theme: any) => {
        if (theme === 'dark') {
            return '#f2f2f2'

        } else if (theme === 'light') {
            return '#000000'
        }

        return '#f2f2f2'
    },
    pickerItemStyles: (theme: any) => {
        return {
            fontSize: 14,
            color: '#000000',
        }
    },
    tabInactiveColor: (theme: any) => {
        if (theme === 'dark') {
            return '#000000'

        } else if (theme === 'light') {
            return '#f2f2f2'
        }

        return '#000000'
    },
    tabActiveColor: (theme: any) => {
        if (theme === 'dark') {
            return '#f2f2f2'

        } else if (theme === 'light') {
            return '#000000'
        }

        return '#f2f2f2'
    },
})

export default styles
