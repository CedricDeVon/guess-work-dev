import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class EmailValidator extends Validator {
    public static readonly singleton: EmailValidator = new EmailValidator()
    
    public static readonly regExpPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    private constructor() {
        super()
    }
    
    public async validate(data: string): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        return (EmailValidator.regExpPattern.test(data)) ? new SuccessfulResult() : new FailedResult('Invalid Email Format')
    }
}
