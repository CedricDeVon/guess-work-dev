import { Result } from '../results/result'
import { Configuration } from './configuration'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

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
} 
