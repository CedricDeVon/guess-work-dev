import { Validator } from './validator'
import type { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class NumericalOutRangeValidator extends Validator {
    public static readonly singleton: NumericalOutRangeValidator = new NumericalOutRangeValidator()

    private constructor() {
        super()
    }

    public async validate(data: number, maximumLimit: number, minimumLimit: number = 0): Promise<Result> {
        if (maximumLimit === undefined || maximumLimit === null || 
            minimumLimit === undefined || minimumLimit === null || 
            typeof maximumLimit !== 'number' || typeof minimumLimit !== 'number' || 
            maximumLimit === minimumLimit) {
            throw new FailedResult('Argument(s) must neither be undefined, null, nor of equal data')

        } else if (minimumLimit >= maximumLimit) {
            throw new FailedResult(`Argument(s) must not be equal nor is the 'minimumLimit' argument greater than 'maximumLimit'`)
        }

        if (data === undefined || data === null || typeof data !== 'number') {
            return new FailedResult(`Argument(s) must be of type number`)

        } else if (minimumLimit <= data && data <= maximumLimit) {
            return new FailedResult(`Argument(s) must not be within the range [${minimumLimit}, ${maximumLimit}]`)
        }

        return new SuccessfulResult()
    }
}
