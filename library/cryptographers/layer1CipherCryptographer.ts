import { utf8ToBytes, bytesToHex, bytesToUtf8, hexToBytes } from '@noble/ciphers/utils'

import { Result } from '../results/result'
import { Cryptographer } from './cryptographer'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'
import { RuntimeBenchmarker } from '../benchmarkers/runtimeBenchmarker'

export class Layer1CipherCryptographer extends Cryptographer {
    public static readonly singleton: Layer1CipherCryptographer = new Layer1CipherCryptographer()

    private constructor() {
        super()
    }

    public encrypt(data: any): Result {
        try {
            return new SuccessfulResult(bytesToHex(utf8ToBytes(data)))
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public decrypt(data: any): Result {
        try {
            return new SuccessfulResult(bytesToUtf8(hexToBytes(data)))
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
}
