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

    private constructor() {
        super()
    }

    public async validate(data: string): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        if (PasswordValidator.lessThanMinimumLengthPattern.test(data)) {
            return new FailedResult(`Passwords Must Contain At Least 8 Characters`)
        
        } else if (PasswordValidator.noLowercasePattern.test(data)) {
            return new FailedResult(`Passwords Must Contain At Least 1 Lowercase Character`)

        } else if (PasswordValidator.noUppercasePattern.test(data)) {
            return new FailedResult(`Passwords Must Contain At Least 1 Uppercase Character`)
        
        } else if (PasswordValidator.noNumberPattern.test(data)) {
            return new FailedResult(`Passwords Must Contain At Least 1 Number`)

        } else if (PasswordValidator.noSymbolPattern.test(data)) {
            return new FailedResult(`Passwords Must Contain At Least 1 Symbol`)

        } else if (PasswordValidator.hasWhitespacePattern.test(data)) {
            return new FailedResult(`Passwords Must nNot Contain spaces`)
        }

        return new SuccessfulResult()
    }
}
