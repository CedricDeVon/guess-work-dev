import { Result } from '../results/result'
import { Cryptographer } from './cryptographer'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class JsonWebTokenCryptographer extends Cryptographer {
    public static readonly singleton: JsonWebTokenCryptographer = new JsonWebTokenCryptographer()

    private constructor() {
        super()
    }

    public sign(data: any): Result {
        try {
            return new SuccessfulResult(jwt.sign({
                ...data, exp: Math.floor(Date.now() / 1000) + parseInt(process.env.EXPO_PUBLIC_JSONWEBTOKEN_DURATION_IN_SECONDS) },
                process.env.EXPO_PUBLIC_JSONWEBTOKEN_KEY))
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public verify(data: any): Result {
        try {
            return new SuccessfulResult(jwt.verify(
                data, process.env.EXPO_PUBLIC_JSONWEBTOKEN_KEY))
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
}