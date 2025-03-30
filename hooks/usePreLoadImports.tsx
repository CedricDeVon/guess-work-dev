import { useCallback } from 'react'
import { BackHandler } from 'react-native'
import { useFocusEffect, useRouter } from 'expo-router'

export function usePreLoadImports(imports: string[]) {
    try {
        if (!imports.length) {
            throw new Error('Please supply a list of valid import paths')
        }

        for (const importPath of imports) {
            console.log(importPath)
        }

    } catch (error: any) {
        console.log(error)
        throw new Error(error.message)
    }        
}
