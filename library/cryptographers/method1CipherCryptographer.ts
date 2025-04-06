import { Result } from '../results/result'
import { Cryptographer } from './cryptographer'
import { FailedResult } from '../results/failedResult'
import { Layer1CipherCryptographer } from './layer1CipherCryptographer'

export class Method1CipherCryptographer extends Cryptographer {
    public static readonly singleton: Method1CipherCryptographer = new Method1CipherCryptographer()

    private constructor() {
        super()
    }

    public encrypt(data: any): Result {
        try {
            return Layer1CipherCryptographer.singleton.encrypt(data)
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public decrypt(data: any): Result {
        try {
            return Layer1CipherCryptographer.singleton.decrypt(data)
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
}
