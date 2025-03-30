import { utf8ToHex, hexToUtf8 } from '@noble/ciphers/utils'

import { Result } from '../results/result'
import { Configuration } from './configuration'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'
import { Layer0CipherCryptographer } from '../cryptographers/layer0CipherCryptographer'
import { Layer1CipherCryptographer } from '../cryptographers/layer1CipherCryptographer'

export class EnvironmentConfiguration extends Configuration {
    public static readonly singleton: EnvironmentConfiguration = new EnvironmentConfiguration()

    private constructor() {
        super()
    } 

    public getRawValue(targetKey: string): Result {
        try {
            if (targetKey === undefined || targetKey === null) {
                return new FailedResult('Argument(s) must neither be undefined nor null')
            
            } else if (typeof targetKey !== 'string') {
                return new FailedResult('Argument(s) must either be of type string or number')
            }
            
            const value: string = (process.env[targetKey] !== undefined) ? `${process.env[targetKey]}` : ''
            return (value !== '') ? new SuccessfulResult(value) : new FailedResult(`Error found at EnvironmentConfigurationReader.getValue(): Environment variable '${targetKey}' does not exist`)

        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public getValueViaMethod1(targetKey: string): Result {
        try {
            let currentResult: any = this.getRawValue(targetKey)
            if (!currentResult.isSuccessful) {
                return currentResult
            }
            
            currentResult = Layer0CipherCryptographer.singleton.decrypt(hexToUtf8(currentResult.data))
            return currentResult
         
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public getValueViaMethod2(targetKey: string): Result {
        try {
            let baseKeyResult: any = this.getValueViaMethod1('EXPO_PUBLIC_CRYPTOGRAPHY_BASE_KEY')
            if (!baseKeyResult.isSuccessful) {
                return baseKeyResult
            }
            let currentResult: any = this.getValueViaMethod1(targetKey)
            if (!currentResult.isSuccessful) {
                return currentResult
            }
            
            currentResult = Layer1CipherCryptographer.singleton.decrypt(
                hexToUtf8(currentResult.data), hexToUtf8(baseKeyResult.data))
            return currentResult
         
        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }
} 
