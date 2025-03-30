import { create } from 'zustand'
import Constants from 'expo-constants'
import Storage from 'expo-sqlite/kv-store'
import defaultConstants from '@/utils/defaultConstants'

const useMainStore = create((set: any) => ({
    // (min, max, value bar. tier, value, max score.) item
    // reset

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

    theme: JSON.parse(Storage.getItemSync('knight-vision_application-theme')) || defaultConstants.THEME,
    changeTheme: () => {
        return set((state: any) => {
            let newTheme: any = state.theme
            if (!newTheme) {
                newTheme = defaultConstants.THEME
                
            } else {
                newTheme = (newTheme === 'dark') ? 'light' : 'dark'
            }
            
            Storage.setItem('application-theme', JSON.stringify(newTheme))
            return { theme: newTheme }
        })
    },

    currentStyleTheme: JSON.parse(Storage.getItemSync('knight-vision_current-style-theme')) || defaultConstants.THEME,
    updateCurrentStyleTheme: (value: any) => {
        return set((state: any) => {
            let newStyleTheme: any = state.currentStyleTheme
            if (!newStyleTheme) {
                newStyleTheme = defaultConstants.THEME
            
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
    stylesSettings: defaultConstants.STYLES_SETTINGS,
    updateStylesSettings: (value: any) => {
        return set((state: any) => {
            return { stylesSettings: { ...state.stylesSettings, ...value } }
        })
    },
    resetStylesSettings: () => {
        return set((state: any) => {
            return { stylesSettings: defaultConstants.STYLES_SETTINGS }
        })
    },

    currentConnectionMode: defaultConstants.CURRENT_CONNECTION_MODE,
    updateCurrentConnectionMode: (value: any) => {
        return set((state: any) => {
            return { currentConnectionMode: value }
        })
    },
    resetCurrentConnectionMode: () => {
        return set((state: any) => {
            return { currentConnectionMode: defaultConstants.CURRENT_CONNECTION_MODE }
        })
    },
    logInForm: defaultConstants.LOG_IN_FORM,
    updateLogInForm: (value: any) => {
        return set((state: any) => {
            return { logInForm: { ...state.logInForm, ...value } }
        })
    },
    resetLogInForm: () => {
        return set((state: any) => {
            return { logInForm: defaultConstants.LOG_IN_FORM }
        })
    },
    signUpForm: defaultConstants.SIGN_UP_FORM,
    updateSignUpForm: (value: any) => {
        return set((state: any) => {
            return { signUpForm: { ...state.signUpForm, ...value } }
        })
    },
    resetSignUpForm: () => {
        return set((state: any) => {
            return { signUpForm: defaultConstants.SIGN_UP_FORM }
        })
    },
    accountNewPasswordForm: defaultConstants.ACCOUNT_NEW_PASSWORD_FORM,
    updateAccountNewPasswordForm: (value: any) => {
        return set((state: any) => {
            return { accountNewPasswordForm: { ...state.accountNewPasswordForm, ...value } }
        })
    },
    resetAccountNewPasswordForm: () => {
        return set((state: any) => {
            return { accountNewPasswordForm: defaultConstants.ACCOUNT_NEW_PASSWORD_FORM }
        })
    },
    achievementsResetProgressForm: defaultConstants.ACHIEVEMENTS_RESET_PROGRESS_FORM,
    updateAchievementsResetProgressForm: (value: any) => {
        return set((state: any) => {
            return { achievementsResetProgressForm: { ...state.achievementsResetProgressForm, ...value } }
        })
    },
    resetAchievementsResetProgressForm: () => {
        return set((state: any) => {
            return { achievementsResetProgressForm: defaultConstants.ACHIEVEMENTS_RESET_PROGRESS_FORM }
        })
    },
    networkStatus: {},
    updateNetworkStatus: (value: any) => {
        return set((state: any) => {
            return { networkStatus: value }
        })
    },
    notificationsForm: JSON.parse(Storage.getItemSync('knight-vision_notifications-form')) || defaultConstants.NOTIFICATIONS_FORM,
    updateNotificationsForm: (value: any) => {
        return set((state: any) => {
            const newData: any = { notificationsForm: { ...state.notificationsForm, ...value } }
            Storage.setItem('knight-vision_notifications-form', newData.notificationsForm)
            return newData
        })
    },
    resetNotificationsForm: () => {
        return set(() => {
            const newData: any = { notifications: defaultConstants.NOTIFICATIONS_FORM }
            Storage.setItem('knight-vision_notifications-form', newData.notificationsForm)
            return newData
        })
    },
    accountProfileForm: defaultConstants.ACCOUNT_PROFILE_FORM,
    updateAccountProfileForm: (value: any) => {
        return set((state: any) => {
            return { accountProfileForm: { ...state.accountProfileForm, ...value } }
        })
    },
    resetAccountProfileForm: () => {
        return set(() => {
            return { accountProfileForm: defaultConstants.ACCOUNT_PROFILE_FORM }
        })
    },
}))

export default useMainStore
