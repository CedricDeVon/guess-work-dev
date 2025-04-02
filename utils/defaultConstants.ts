
const defaultConstants: any = {    
    APPLICATION_THEME: 'dark',
    APPLICATION_CONNECTION_MODE: 'offline',
    APPLICATION_FORM: { isSubmitting: false, isDisabled: false, errorMessage: '' },
    AUTH_LOG_IN: { isSubmitting: false, isDisabled: false, errorMessage: '', username: '', password: '', showPassword: false, rememberMe: false },
    AUTH_SIGN_UP: { isSubmitting: false, isDisabled: false, errorMessage: '', username: '', email: '', password: '', confirmPassword: '', showPassword: false, rememberMe: false },
    USER_ACCOUNT_PROFILE: { isSubmitting: false, isDisabled: false, errorMessage: '', profilePictureUrl: '', profilePictureUri: '',  username: '', fullName: '', selectedGender: { label: 'None', value: 'none' }, selectedNationality: { label: 'Global', value: 'UN' }, birthday: '', bio: '' },
    USER_ACCOUNT_NEW_PASSWORD: { isSubmitting: false, isDisabled: false, errorMessage: '', password: '', confirmPassword: '', showPassword: false },
    USER_ACHIEVEMENTS: { isSubmitting: false, isDisabled: false, errorMessage: '' },
    USER_STYLES: { isSubmitting: false, isDisabled: false, errorMessage: '' },
    USER_NOTIFICATIONS: { isSubmitting: false, isDisabled: false, errorMessage: '', selectedTimeInHours: { label: '12', value: 12 }, selectedTimeInMinutes:  { label: '00', value: 0 }, selectedTimeOfDay:  { label: 'PM', value: 'pm' }, contentTitle: '', contentMessage: '', isNotificationDisabled: false },
}

export default defaultConstants
