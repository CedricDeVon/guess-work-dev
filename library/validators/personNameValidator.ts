import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class PersonNameValidator extends Validator {
    public static readonly singleton: PersonNameValidator = new PersonNameValidator()
    
    public static readonly regExpPattern: RegExp = /^[a-zA-Z\s'-.]{2,255}$/
    
    private constructor() {
        super()
    }

    public async validate(data: string): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        return (PersonNameValidator.regExpPattern.test(data)) ? new SuccessfulResult() : new FailedResult('First Names, Middle Names, And Last Names Must Neither Contain Symbols Nor Numbers')
    }
}
