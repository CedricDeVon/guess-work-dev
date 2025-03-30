import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class PhoneNumberValidator extends Validator {
    public static readonly singleton: PhoneNumberValidator = new PhoneNumberValidator()

    public static readonly regExpPattern: RegExp = /^\+?[0-9]{7,15}$/

    private constructor() {
        super()
    }

    public async validate(data: string): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'string') {
            return new FailedResult(`Arguments must be of type string`)
        }

        return (PhoneNumberValidator.regExpPattern.test(data)) ? new SuccessfulResult() : new FailedResult('Invalid phone number format')
    }
}
