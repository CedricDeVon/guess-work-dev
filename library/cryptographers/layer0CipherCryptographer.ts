import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'
import { RuntimeBenchmarker } from '../benchmarkers/runtimeBenchmarker'

export class Layer0CipherCryptographer extends Cryptographer {
    public static readonly singleton: Layer0CipherCryptographer = new Layer0CipherCryptographer()

    private constructor() {
        super()
    }

    public encrypt(data: any): Result {
        try {
            let va = ''
            for (let ia = data.length; ia > -1; --ia) {
                va += data[ia]
            }
            return new SuccessfulResult(va)
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public decrypt(data: any): Result {
        try {
            let va = ''
            for (let ia = 0; ia < data.length; ++ia) {
                va += data[ia]
            }
            return new SuccessfulResult(va)
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
}
