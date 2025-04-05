
export const timeInHoursSelections: any[] = []
for (let index: number = 1; index < 13; ++index) {
    timeInHoursSelections.push({ label: `${index}`, value: index })
}

export const timeInMinutesSelections: any[] = []
for (let index: number = 0; index < 61; index += 5) {
    timeInMinutesSelections.push({ label: (index < 10) ? `0${index}` : `${index}`, value: index })
}

export const genderSelections: any[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
]

export const nationalitySelections: any[] = [
    { label: 'Anonymous', value: 'UN' },
    { label: 'Philippines', value: 'PH' },
]

export const timeOfDaySelections: any[] = [
    { label: 'AM', value: 'am' },
    { label: 'PM', value: 'pm' },
]

export const appplicationThemeSelections: any[] = [
    { label: 'Dark Theme', value: 'dark' },
    { label: 'Light Theme', value: 'light' },
]

export const defaultUserMetadata: any = {
    styles: {
        theme: 'dark'
    },
    notifications: {
        timeInHours: 1,
        timeInMinutes: 0,
        timeOfDay: 'am'
    },
}

export const defaultConstants: any = {    
    APPLICATION_THEME: 'dark',
    APPLICATION_GLOBALS: { isSubmitting: false, isDisabled: false, errorMessage: '', connectionMode: 'offline' },
    AUTH_LOG_IN_FORM: { isSubmitting: false, isDisabled: false, errorMessage: '', email: '', password: '', showPassword: false, rememberMe: false },
    AUTH_SIGN_UP_FORM: { isSubmitting: false, isDisabled: false, errorMessage: '', username: '', email: '', password: '', confirmPassword: '', showPassword: false, rememberMe: false },
    USER_ACCOUNT_PROFILE: { isSubmitting: false, isDisabled: false, errorMessage: '', profilePictureUrl: '', profilePictureUri: '',  username: '', fullName: '', selectedGender: genderSelections[0], selectedNationality: nationalitySelections[0], birthday: '', bio: '' },
    USER_ACCOUNT_NEW_PASSWORD: { isSubmitting: false, isDisabled: false, errorMessage: '', password: '', confirmPassword: '', showPassword: false },
    USER_ACHIEVEMENTS: { isSubmitting: false, isDisabled: false, errorMessage: '' },
    USER_STYLES: { isSubmitting: false, isDisabled: false, errorMessage: '' },
    USER_NOTIFICATIONS: { isSubmitting: false, isDisabled: false, errorMessage: '', selectedTimeInHours: timeInHoursSelections[0], selectedTimeInMinutes:  timeInMinutesSelections[0], selectedTimeOfDay: timeOfDaySelections[0], contentTitle: '', contentMessage: '', isNotificationDisabled: false },
}
