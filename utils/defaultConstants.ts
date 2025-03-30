
const defaultConstants: any = {    
    THEME: 'dark',
    CURRENT_CONNECTION_MODE: 'offline',
    LOG_IN_FORM: { isSubmitting: false, isDisabled: false, errorMessage: '', username: '', password: '', showPassword: false, rememberMe: false },
    SIGN_UP_FORM: { isSubmitting: false, isDisabled: false, errorMessage: '', username: '', email: '', password: '', confirmPassword: '', showPassword: false, rememberMe: false },
    ACCOUNT_NEW_PASSWORD_FORM: { isSubmitting: false, isDisabled: false, errorMessage: '', password: '', confirmPassword: '', showPassword: false },
    STYLES_SETTINGS: { isSubmitting: false, isDisabled: false, errorMessage: '' },
    ACHIEVEMENTS_RESET_PROGRESS_FORM: { isSubmitting: false, isDisabled: false, errorMessage: '' },
    NOTIFICATIONS_FORM: { isSubmitting: false, isDisabled: false, errorMessage: '', selectedTimeInHours: { label: '12', value: 12 }, selectedTimeInMinutes:  { label: '00', value: 0 }, selectedTimeOfDay:  { label: 'PM', value: 'pm' }, contentTitle: '', contentMessage: '', isNotificationDisabled: false },
    ACCOUNT_PROFILE_FORM: { isSubmitting: false, isDisabled: false, errorMessage: '', profilePictureUrl: '', profilePictureUri: '',  username: '', fullName: '', selectedGender: { label: 'None', value: 'none' }, selectedNationality: { label: 'Global', value: 'UN' }, birthday: '', bio: '' },
}

export default defaultConstants
