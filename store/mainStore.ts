import { create } from 'zustand'
import Constants from 'expo-constants'
import Storage from 'expo-sqlite/kv-store'

import { defaultConstants } from '@/utils/defaultConstants'
import { Method2CipherCryptographer } from '@/library/cryptographers/method2CipherCryptographer'

const useMainStore = create((set: any) => ({
    userAccount: JSON.parse(Storage.getItemSync('knight-vision_user-account') || JSON.stringify('')) || '',
    extractUserAccount: (data: any) => {
        return (data) ? JSON.parse(Method2CipherCryptographer.singleton.decrypt(data).data) : ''
    },
    updateUserAccount: (value: any) => {
        return set((state: any) => {
            let newData: any = (state.userAccount) ? JSON.parse(Method2CipherCryptographer.singleton.decrypt(state.userAccount).data) : {}
            value.userPassword = Method2CipherCryptographer.singleton.encrypt(value.userPassword).data
            newData = Method2CipherCryptographer.singleton.encrypt(JSON.stringify({ ...newData, ...value })).data
            Storage.setItem('knight-vision_user-account', JSON.stringify(newData))
            return { userAccount: newData }
        })
    },
    resetUserAccount: () => {
        return set((state: any) => {
            const newData: any = ''
            Storage.setItem('knight-vision_user-account', JSON.stringify(newData))
            return { userAccount: newData }
        })
    },
    applicationVersion: Constants.expoConfig?.version || 'None',
    updateAppVersion: (value: any) => {
        return set((state: any) => {
            return { applicationVersion: value }
        })
    },
    resetAppVersion: () => {
        return set((state: any) => {
            return { applicationVersion: 'None' }
        })
    },
    currentDateYear: new Date().getFullYear(),
    updateCurrentDateYear: () => {
        return set((state: any) => {
            return { currentDateYear: new Date().getFullYear() }
        })
    },

    currentStyleTheme: JSON.parse(Storage.getItemSync('knight-vision_current-style-theme')) || defaultConstants.APPLICATION_THEME,
    updateCurrentStyleTheme: (value: any) => {
        return set((state: any) => {
            let newStyleTheme: any = state.currentStyleTheme
            if (!newStyleTheme) {
                newStyleTheme = defaultConstants.APPLICATION_THEME
            
            } else {
                newStyleTheme = value
            }
            
            Storage.setItem('knight-vision_current-style-theme', JSON.stringify(newStyleTheme))
            return { currentStyleTheme: newStyleTheme }
        })
    },
    changeCurrentStyleTheme: () => {
        return set((state: any) => {
            let newStyleTheme: any = state.currentStyleTheme
            if (!newStyleTheme) {
                newStyleTheme = 'dark'
            
            } else {
                newStyleTheme = (newStyleTheme === 'dark') ? 'light' : 'dark'
            }
            
            Storage.setItem('knight-vision_current-style-theme', JSON.stringify(newStyleTheme))
            return { currentStyleTheme: newStyleTheme }
        })
    },
    stylesSettings: defaultConstants.USER_STYLES,
    updateStylesSettings: (value: any) => {
        return set((state: any) => {
            return { stylesSettings: { ...state.stylesSettings, ...value } }
        })
    },
    resetStylesSettings: () => {
        return set((state: any) => {
            return { stylesSettings: defaultConstants.USER_STYLES }
        })
    },

    applicationGlobals: defaultConstants.APPLICATION_GLOBALS,
    updateApplicationGlobals: (value: any) => {
        return set((state: any) => {
            return { applicationGlobals: { ...state.applicationGlobals, ...value } }
        })
    },
    updateApplicationGlobalsToDisabled: () => {
        return set((state: any) => {
            return { applicationGlobals: { ...state.applicationGlobals, isDisabled: true } }
        })
    },
    updateApplicationGlobalsToEnabled: () => {
        return set((state: any) => {
            return { applicationGlobals: { ...state.applicationGlobals, isDisabled: false } }
        })
    },
    updateApplicationGlobalsToSubmitting: () => {
        return set((state: any) => {
            return { applicationGlobals: { ...state.applicationGlobals, isSubmitting: true, isDisabled: true } }
        })
    },
    updateApplicationGlobalsToUnSubmitting: () => {
        return set((state: any) => {
            return { applicationGlobals: { ...state.applicationGlobals, isSubmitting: false, isDisabled: false } }
        })
    },
    resetApplicationGlobals: () => {
        return set((state: any) => {
            return { applicationGlobals: defaultConstants.APPLICATION_GLOBALS }
        })
    },
    authLogInForm: defaultConstants.AUTH_LOG_IN_FORM,
    updateAuthLogInForm: (value: any) => {
        return set((state: any) => {
            return { authLogInForm: { ...state.authLogInForm, ...value } }
        })
    },
    resetAuthLogInForm: () => {
        return set((state: any) => {
            return { authLogInForm: defaultConstants.AUTH_LOG_IN_FORM }
        })
    },
    authSignUpForm: defaultConstants.AUTH_SIGN_UP_FORM,
    updateAuthSignUpForm: (value: any) => {
        return set((state: any) => {
            return { authSignUpForm: { ...state.authSignUpForm, ...value } }
        })
    },
    resetAuthSignUpForm: () => {
        return set((state: any) => {
            return { authSignUpForm: defaultConstants.AUTH_SIGN_UP_FORM }
        })
    },
    resetAuthForms: () => {
        return set((state: any) => {
            return { authLogInForm: defaultConstants.AUTH_LOG_IN_FORM, authSignUpForm: defaultConstants.AUTH_SIGN_UP_FORM }
        })
    },


    accountNewPasswordForm: defaultConstants.USER_ACCOUNT_NEW_PASSWORD,
    updateAccountNewPasswordForm: (value: any) => {
        return set((state: any) => {
            return { accountNewPasswordForm: { ...state.accountNewPasswordForm, ...value } }
        })
    },
    resetAccountNewPasswordForm: () => {
        return set((state: any) => {
            return { accountNewPasswordForm: defaultConstants.USER_ACCOUNT_NEW_PASSWORD }
        })
    },
    achievementsResetProgressForm: defaultConstants.USER_ACHIEVEMENTS,
    updateAchievementsResetProgressForm: (value: any) => {
        return set((state: any) => {
            return { achievementsResetProgressForm: { ...state.achievementsResetProgressForm, ...value } }
        })
    },
    resetAchievementsResetProgressForm: () => {
        return set((state: any) => {
            return { achievementsResetProgressForm: defaultConstants.USER_ACHIEVEMENTS }
        })
    },
    networkState: {},
    updateNetworkState: (value: any) => {
        return set((state: any) => {
            return { networkState: value }
        })
    },
    notificationsForm: JSON.parse(Storage.getItemSync('knight-vision_notifications-form')) || defaultConstants.USER_NOTIFICATIONS,
    updateNotificationsForm: (value: any) => {
        return set((state: any) => {
            const newData: any = { notificationsForm: { ...state.notificationsForm, ...value } }
            Storage.setItem('knight-vision_notifications-form', newData.notificationsForm)
            return newData
        })
    },
    resetNotificationsForm: () => {
        return set(() => {
            const newData: any = { notifications: defaultConstants.USER_NOTIFICATIONS }
            Storage.setItem('knight-vision_notifications-form', newData.notificationsForm)
            return newData
        })
    },
    accountProfileForm: defaultConstants.USER_ACCOUNT_PROFILE,
    updateAccountProfileForm: (value: any) => {
        return set((state: any) => {
            return { accountProfileForm: { ...state.accountProfileForm, ...value } }
        })
    },
    resetAccountProfileForm: () => {
        return set(() => {
            return { accountProfileForm: defaultConstants.USER_ACCOUNT_PROFILE }
        })
    },
}))

export default useMainStore
