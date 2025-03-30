import { Validator } from './validator'
import type { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class PersonAgeValidator extends Validator {
    public static readonly singleton: PersonAgeValidator = new PersonAgeValidator()

    private constructor() {
        super()
    }

    public async validate(data: number): Promise<Result> {
        if (data === undefined || data === null || typeof data !== 'number') {
            return new FailedResult(`Argument(s) must be of type number`)
        }

        return (-1 < data && data < 129) ? new SuccessfulResult() : new FailedResult(`A human age must be in-between the ages 0 to 128`)
    }
}
