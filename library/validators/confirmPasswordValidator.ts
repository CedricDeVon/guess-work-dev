import { Validator } from './validator'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class ConfirmPasswordValidator extends Validator {
    public static readonly singleton: ConfirmPasswordValidator = new ConfirmPasswordValidator()

    private constructor() {
        super()
    }

    public async validate(data: any): Promise<Result> {
        if (data === undefined || data === null ||
            data.password === undefined || data.confirmPassword === undefined) {
            return new FailedResult(`Argument(s) must be of type object with a password and confirmPassword string type properties`)
        }

        return (data.password === data.confirmPassword) ? new SuccessfulResult() : new FailedResult('Both Passwords Must Match')
    }
}
