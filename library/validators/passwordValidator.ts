import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class PasswordValidator extends Validator {
    public static readonly singleton: PasswordValidator = new PasswordValidator()

    public static readonly lessThanMinimumLengthRegExpPattern: RegExp = /^.{0,7}$/

    public static readonly noNumberRegExpPattern: RegExp = /^(?!.*\d).*$/

    public static readonly noLowercaseRegExpPattern: RegExp = /^(?!.*[a-z]).*$/

    public static readonly noUppercaseRegExpPattern: RegExp = /^(?!.*[A-Z]).*$/

    public static readonly noSymbolRegExpPattern: RegExp = /^(?!.*[!@#$%^&*(),.?":{}|<>]).*$/

    public static readonly hasWhitespaceRegExpPattern: RegExp = /.*\s.*/

    public static readonly maxLength: number = 128

    private constructor() {
        super()
    }

    public async validate(data: string): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        if (PasswordValidator.lessThanMinimumLengthRegExpPattern.test(data)) {
            return new FailedResult(`Passwords Must Contain At Least 8 Characters`)
        
        } else if (PasswordValidator.noLowercaseRegExpPattern.test(data)) {
            return new FailedResult(`Passwords Must Contain At Least 1 Lowercase Character`)

        } else if (PasswordValidator.noUppercaseRegExpPattern.test(data)) {
            return new FailedResult(`Passwords Must Contain At Least 1 Uppercase Character`)
        
        } else if (PasswordValidator.noNumberRegExpPattern.test(data)) {
            return new FailedResult(`Passwords Must Contain At Least 1 Number`)

        } else if (PasswordValidator.noSymbolRegExpPattern.test(data)) {
            return new FailedResult(`Passwords Must Contain At Least 1 Symbol`)

        } else if (PasswordValidator.hasWhitespaceRegExpPattern.test(data)) {
            return new FailedResult(`Passwords Must nNot Contain spaces`)
        }

        return new SuccessfulResult()
    }
}
