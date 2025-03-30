import type { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class ClientDataTransformer import Transformer {
    public static readonly singleton: ClientDataTransformer = new ClientDataTransformer()

    public static readonly defaultValue: string = 'None'

    public static readonly emptyValue: string = ''

    private constructor() {
        super()
    }

    public convertDirectly(data: any): string {
        return this.convert(data).data
    }
    
    public toDefaultValueIfUndefined(data: any): string {
        return (data) ? data : ClientDataTransformer.defaultValue
    }

    public toEmptyValueIfUndefined(data: any): string {
        return (data) ? data : ClientDataTransformer.emptyValue
    }

    public toPersonFullName(data: any): string {
        if (!data) {
            return ClientDataTransformer.defaultValue
        }

        const lastName = data.last_name || ''
        const firstName = data.first_name || ''
        const middleName = data.middle_name || ''
        const suffixName = data.suffix_name || ''

        return (lastName || firstName || middleName || suffixName) ? `${lastName}${(lastName) ? ', ' : ''} ${firstName} ${middleName} ${suffixName}` : ClientDataTransformer.defaultValue
    }

    public toPersonAge(date: string): string {
        if (!date) {
            return ClientDataTransformer.defaultValue
        }

        const birthDate: any = new Date(date)
        const otherDate: any = new Date()
        let years: any = (otherDate.getFullYear() - birthDate.getFullYear())
        if (otherDate.getMonth() < birthDate.getMonth() || 
            otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
            years--
        }

        return years
    }

    public toStringList(data: string[]): string {
        return (data) ? data.join(', ') : ClientDataTransformer.defaultValue
    }

    public toStandardDateFormat1(date: string): string {
        return (date) ? new Date(date).toISOString() : ClientDataTransformer.defaultValue
    }

    public toStandardDateFormat2(date: string): string {
        return (date) ? new Date(date).toDateString() : ClientDataTransformer.defaultValue
    }
}
