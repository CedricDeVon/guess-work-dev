import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class UserNameValidator extends Validator {    
    public static readonly singleton: UserNameValidator = new UserNameValidator()
    
    public static readonly hasWhitespacePattern: RegExp = /.*\s.*/

    private constructor() {
        super()
    }

    public async validate(data: string): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        if (data.length < 8) {
            return new FailedResult('Usernames must contain at least 8 characters')
        
        } else if (UserNameValidator.hasWhitespacePattern.test(data)) {
            return new FailedResult(`Usernames must not contain spaces`)
        }

        return new SuccessfulResult()
    }
}
