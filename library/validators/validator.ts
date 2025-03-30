import { Result } from '../results/result'

export abstract class Validator {
    public abstract validate(data: any): Promise<Result>
}
