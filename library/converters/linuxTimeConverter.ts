import { Converter } from './converter'
import type { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class LinuxTimeConverter extends Converter {
    public static readonly singleton: LinuxTimeConverter = new LinuxTimeConverter()

    private constructor() {
        super()
    }

    public convert(data: string | number | Date): Result {
        try {
            const date = new Date(data)
            
            if (date.toString() === 'Invalid Date') {
                return new FailedResult(date.toString())
            }

            return new SuccessfulResult(data / 1000)

        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
}
