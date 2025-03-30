import { Validator } from './validator'
import type { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class NumericalInRangeValidator extends Validator {
    public static readonly singleton: NumericalInRangeValidator = new NumericalInRangeValidator()

    private constructor() {
        super()
    }
    
    public async validate(data: number, maximumLimit: number, minimumLimit: number = 0): Promise<Result> {
        if (maximumLimit === undefined || maximumLimit === null || 
            minimumLimit === undefined || minimumLimit === null || 
            typeof maximumLimit !== 'number' || typeof minimumLimit !== 'number' || 
            maximumLimit === minimumLimit) {
            return new FailedResult('Argument(s) must neither be undefined, null, nor of equal data')

        } else if (minimumLimit == maximumLimit) {
            return new FailedResult(`Argument(s) must not be equal`)
        }

        if (data === undefined || data === null || typeof data !== 'number') {
            return new FailedResult(`Argument(s) must be of type number`)

        } else if (data < minimumLimit) {
            return new FailedResult(`Argument(s) must be greater than or equal to '${minimumLimit}'`)

        } else if (data > maximumLimit) {
            return new FailedResult(`Argument(s) must be less than or equal to '${maximumLimit}'`)
        }

        return new SuccessfulResult()
    }
}
