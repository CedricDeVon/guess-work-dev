import { supabase } from '../../utils/supabase'

import { Database } from './database'
import { Result } from '../results/result'
import { FailedResult } from '../results/failedResult'
import { SuccessfulResult } from '../results/successfulResult'

export class SupabaseDatabase extends Database {
    public static readonly singleton: SupabaseDatabase = new SupabaseDatabase()
    
    private constructor() {
        super()
    }

    public getClient(): Result {
        try {
            return new SuccessfulResult(supabase)

        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public async executeClient(supabaseClient: any): Promise<any> {
        try {
            SupabaseDatabase._throwIfUndefinedOrNull(supabaseClient)

            supabaseClient = await supabaseClient
            supabaseClient = { ...supabaseClient, ...supabaseClient.error }
            delete supabaseClient.error
            return new SuccessfulResult(supabaseClient).toObject()

        } catch (error: any) {
            return new FailedResult(error.message).toObject()
        }
    }

    public fromBaseSchemaTable(supabaseClient: any, tableName: string): Result {
        try {
            SupabaseDatabase._throwIfUndefinedOrNull(supabaseClient)
            SupabaseDatabase._throwIfUndefinedOrNull(tableName)

            supabaseClient = supabaseClient
                .schema(process.env.EXPO_PUBLIC_SUPABASE_BASE_SCHEMA_NAME)
                .from(tableName)
                
            return new SuccessfulResult(supabaseClient)

        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public parseQueryStringParameterSelectedColumns(supabaseClient: any, queryParameters: any): Result {
        try {
            SupabaseDatabase._throwIfUndefinedOrNull(supabaseClient)
            
            queryParameters = queryParameters['selected-columns'] || '*'
            supabaseClient = supabaseClient
                .select(queryParameters)

            return new SuccessfulResult(supabaseClient)

        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public parseQueryStringParameterOrderedColumns(supabaseClient: any, queryParameters: any): Result {
        try {
            SupabaseDatabase._throwIfUndefinedOrNull(supabaseClient)

            const orderedColumns: string[] = (queryParameters['ordered-columns']) ?
                queryParameters['ordered-columns'].split(',') : []
            let orderType: boolean
            let orderedColumnName: string
            let orderedColumnType: string
            orderedColumns.forEach((orderedColumn: any) => {
                orderedColumn = orderedColumn.split(':')
                orderedColumnName = orderedColumn[0]
                orderedColumnType = orderedColumn[1]

                orderType = true
                if (orderedColumnType === 'ascending' ||
                    orderedColumnType === 'asc') {
                    orderType = true

                } else if (orderedColumnType === 'descending' ||
                    orderedColumnType === 'desc') {
                    orderType = false

                } else {
                    throw new Error(`Invalid 'ordered-columns' query string parameter. Please follow this format '[table_column]:[asc|ascending|desc|descending],...'`)
                }

                supabaseClient = supabaseClient.order(orderedColumnName, { ascending: orderType })
            })

            return new SuccessfulResult(supabaseClient)

        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    public parseQueryStringParameterSelectedRowRange(supabaseClient: any, queryParameters: any): Result {
        try {
            SupabaseDatabase._throwIfUndefinedOrNull(supabaseClient)

            const selectedRowRange: any[] = (queryParameters['selected-row-range']) ? queryParameters['selected-row-range'].split(':') : [-1, -1]
            const selectedRowStartingRange: number = parseInt(selectedRowRange[0])
            const selectedRowEndingRange: number = parseInt(selectedRowRange[1])
            if (selectedRowStartingRange === -1 || selectedRowEndingRange === -1) {
                return new SuccessfulResult(supabaseClient)
            }
            
            if (selectedRowStartingRange < 0 ||
                selectedRowStartingRange > selectedRowEndingRange ||
                selectedRowEndingRange < 0 ||
                selectedRowEndingRange < selectedRowStartingRange) {
                return new FailedResult(`Invalid 'selected-row-range' query string parameter. Please follow this format '[start]:[end]'`)
            }
            supabaseClient = supabaseClient.range(selectedRowStartingRange, selectedRowEndingRange)
            return new SuccessfulResult(supabaseClient)

        } catch (error: any) {
            return new FailedResult(error.message)
        }
    }

    private static _throwIfUndefinedOrNull(value: any): void {
        if (value === undefined || value === null) {
            throw new Error('undefined or null values are invalid')
        }
    }
}

