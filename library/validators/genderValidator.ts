import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class GenderValidator extends Validator {
    public static readonly singleton: GenderValidator = new GenderValidator()
    
    private static readonly _validOptions: Set<string> = new Set<string>(['male', 'female', 'others'])

    public static get validOptions(): Array<string> {
        return [...GenderValidator._validOptions]
    }

    private constructor() {
        super()
    }

    public async validate(data: any): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        return (GenderValidator._validOptions.has(data)) ? new SuccessfulResult() : new FailedResult(`'${data}' is neither of these valid types: '${GenderValidator._validOptions}'`)
    }
}
