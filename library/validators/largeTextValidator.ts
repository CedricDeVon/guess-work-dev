import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class LargeTextValidator extends Validator {
    public static readonly maximumLimit: number = Math.pow(2, 24) + 1

    public static readonly singleton: LargeTextValidator = new LargeTextValidator()

    private constructor() {
        super()
    }

    public async validate(data: string): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        return (data.length < LargeTextValidator.maximumLimit) ? new SuccessfulResult() : new FailedResult(`The given text must contain at most ${LargeTextValidator.maximumLimit} characters`)
    }
}
