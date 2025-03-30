import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class PastDateValidator extends Validator {
    public static readonly singleton: PastDateValidator = new PastDateValidator()

    private constructor() {
        super()
    }

    public async validate(data: string | number | Date): Promise<Result> {
        if (data === undefined || data === null ||
            (typeof data !== 'string' && typeof data !== 'number' && !(data instanceof Date))) {
            return new FailedResult(`Argument(s) must be of type string`)
        }

        return (new Date(data) < new Date()) ? new SuccessfulResult() : new FailedResult('Date Is Not From The Past')
    }
}
