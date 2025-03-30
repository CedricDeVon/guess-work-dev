import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class SmallTextValidator extends Validator {
    public static readonly singleton: SmallTextValidator = new SmallTextValidator()

    public static readonly maximumLimit: number = Math.pow(2, 8) + 1    

    private constructor() {
        super()
    }

    public async validate(data: string): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        return (data.length < SmallTextValidator.maximumLimit) ? new SuccessfulResult() : new FailedResult(`The given text must contain at most ${SmallTextValidator.maximumLimit} characters`)
    }
}
