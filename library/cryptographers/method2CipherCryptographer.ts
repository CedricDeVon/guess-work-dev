import { Result } from '../results/result'
import { Cryptographer } from './cryptographer'
import { FailedResult } from '../results/failedResult'
import { Layer2CipherCryptographer } from './layer2CipherCryptographer'
import { Method1CipherCryptographer } from './method1CipherCryptographer'

export class Method2CipherCryptographer extends Cryptographer {
    public static readonly singleton: Method2CipherCryptographer = new Method2CipherCryptographer()

    private static readonly _keyEnvName: string = 'EXPO_PUBLIC_CRYPTOGRAPHY_KEY_1'

    private static readonly _nonceEnvName: string = 'EXPO_PUBLIC_CRYPTOGRAPHY_NONCE_1'

    private constructor() {
        super()
    }

    public encrypt(data: any): Result {
        try {
            const result: any = Layer2CipherCryptographer.singleton.encrypt(data,
                process.env.EXPO_PUBLIC_CRYPTOGRAPHY_KEY_1, process.env.EXPO_PUBLIC_CRYPTOGRAPHY_NONCE_1)
            return result
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public decrypt(data: any): Result {
        try {
            const result: any = Layer2CipherCryptographer.singleton.decrypt(data,
                process.env.EXPO_PUBLIC_CRYPTOGRAPHY_KEY_1, process.env.EXPO_PUBLIC_CRYPTOGRAPHY_NONCE_1)
            return result
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
}
