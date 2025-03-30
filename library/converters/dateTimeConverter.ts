import { Converter } from './converter'
import type { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class DateTimeConverter extends Converter {
    public static readonly singleton: DateTimeConverter = new DateTimeConverter()

    private constructor() {
        super()
    }

    public convert(data: string | number | Date): Result {
        try {
            const date = new Date(data)
            
            if (date.toString() === 'Invalid Date') {
                return new FailedResult(date.toString())
            }
            
            return new SuccessfulResult(new Date(data).toDateString())

        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
}
