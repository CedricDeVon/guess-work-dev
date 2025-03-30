import { xchacha20poly1305 } from '@noble/ciphers/chacha'
import { utf8ToBytes, bytesToUtf8, bytesToHex } from '@noble/ciphers/utils'

import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'
import { BaseCipherCryptographer } from './baseCipherCryptographer'
import { RuntimeBenchmarker } from '../benchmarkers/runtimeBenchmarker'

export class Layer1CipherCryptographer extends Cryptographer {
    public static readonly singleton: Layer1CipherCryptographer = new Layer1CipherCryptographer()

    private constructor() {
        super()
    }

    public encrypt(data: any, key: string): Result {
        try { 
            return new SuccessfulResult(xchacha20poly1305(utf8ToBytes(key), utf8ToBytes('000000000000000000000000')).encrypt(utf8ToBytes(data)))
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public decrypt(data: any, key: string): Result {
        try {
            return new SuccessfulResult(xchacha20poly1305(utf8ToBytes(key), utf8ToBytes('000000000000000000000000')).decrypt(utf8ToBytes(data)))
            
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
}

/*
const key = utf8ToBytes('L6q<K7]v?BJ=}~cn-Vy@(YbHL6q<K7]v')
const nonce = utf8ToBytes('L6q<K7]v?BJ=}~cn-Vy@(YbH')
const chacha = xchacha20poly1305(key, nonce)
const data_ = chacha.decrypt(data)

RuntimeBenchmarker.singleton.tick()
console.log(bytesToHex(ciphertext))
console.log(bytesToUtf8(data_))
RuntimeBenchmarker.singleton.tick('A')

key = utf8ToBytes('L6q<K7]v?BJ=}~cn-Vy@(YbHL6q<K7]v')
nonce = utf8ToBytes('012345678912345678901234')
chacha = xchacha20poly1305(key, nonce)
data = utf8ToBytes(`Lorem ipsum dolor sit amet`)
ciphertext = chacha.encrypt(data)
data_ = chacha.decrypt(ciphertext) // bytesToUtf8(data_) === data

RuntimeBenchmarker.singleton.tick()
console.log(bytesToHex(ciphertext))
console.log(bytesToUtf8(data_))
RuntimeBenchmarker.singleton.tick('B')
*/