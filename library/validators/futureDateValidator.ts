import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class FutureDateValidator extends Validator {
    public static readonly singleton: FutureDateValidator = new FutureDateValidator()

    private constructor() {
        super()
    }

    public async validate(data: string | number | Date): Promise<Result> {
        if (data === undefined || data === null ||
            (typeof data !== 'string' &&
            typeof data !== 'number' && !(data instanceof Date))) {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        return (new Date() < new Date(data)) ? new SuccessfulResult() : new FailedResult('Value is not a valid future date')
    }
}
