import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class MediumTextValidator extends Validator {
    public static readonly maximumLimit: number = Math.pow(2, 16) + 1

    public static readonly singleton: MediumTextValidator = new MediumTextValidator()

    private constructor() {
        super()
    }

    public async validate(data: string): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'string') {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        return (data.length < MediumTextValidator.maximumLimit) ? new SuccessfulResult() : new FailedResult(`The given text must contain at most ${MediumTextValidator.maximumLimit} characters`)
    }
}
