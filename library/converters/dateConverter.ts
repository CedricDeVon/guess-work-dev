import { Converter } from './converter'
import type { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class DateConverter extends Converter {
    public static readonly singleton: DateConverter = new DateConverter()

    private static readonly _months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

    public static get months(): string[] {
        return [...DateConverter._months]
    }
    
    private constructor() {
        super()
    }

    public convert(data: string | number): Result {
        try {
            const date = new Date(data)
            
            if (date.toString() === 'Invalid Date') {
                return new FailedResult(date.toString())
            }
            
            const month = DateConverter._months[date.getUTCMonth()]
            const day = date.getUTCDate()
            const year = date.getUTCFullYear()
    
            return new SuccessfulResult(`${month} ${day}, ${year}`)

        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
}
