import { gcm } from '@noble/ciphers/aes'
import { Cryptographer } from './cryptographer'
import { randomBytes } from '@noble/ciphers/webcrypto'
import { utf8ToBytes, bytesToHex, hexToBytes, bytesToUtf8 } from '@noble/ciphers/utils'

import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'
import { RuntimeBenchmarker } from '../benchmarkers/runtimeBenchmarker'

export class Layer2CipherCryptographer extends Cryptographer {
    public static readonly singleton: Layer2CipherCryptographer = new Layer2CipherCryptographer()

    private constructor() {
        super()
    }

    public encrypt(data: any, key: string, nonce: string): Result {
        try { 
            return new SuccessfulResult(bytesToHex(gcm(utf8ToBytes(key), utf8ToBytes(nonce)).encrypt(utf8ToBytes(data))))
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }


    public decrypt(data: any, key: string, nonce: string): Result {
        try {
            return new SuccessfulResult(bytesToUtf8(gcm(utf8ToBytes(key), utf8ToBytes(nonce)).decrypt(hexToBytes(data))))
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
}
