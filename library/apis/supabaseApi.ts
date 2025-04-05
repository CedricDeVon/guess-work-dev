import { API } from './api'
import { FailedResult } from '../results/failedResult'
import { Benchmarkers } from '../benchmarkers/benchmarkers'
import { SuccessfulResult } from '../results/successfulResult'
import { SupabaseDatabase } from '../databases/supabaseDatabase'

export class SupabaseAPI extends API {
    private _idempotencyKeys: Set<string>

    public readonly supabaseDatabase: SupabaseDatabase

    public static readonly singleton: SupabaseAPI = new SupabaseAPI()

    private constructor() {
        super()

        this._idempotencyKeys = new Set<string>()
        this.supabaseDatabase = SupabaseDatabase.singleton
    }

    public async uploadStorageFile(bucketName: string, filePath: string, file: any) {
        try {
            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            const { data, error } = await client.data
                .storage.from(bucketName)
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true
                })
            if (error) {            
                return new FailedResult(error).toObjectWithMerge({ status: 400 })
            }

            return new SuccessfulResult(data).toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async downloadStorageFile(bucketName: string, filePath: string) {
        try {
            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            const { data, error } = await client.data
                .storage.from(bucketName).getPublicUrl(filePath)
            if (error) {            
                return new FailedResult(error).toObjectWithMerge({ status: 400 })
            }

            return new SuccessfulResult(data.publicUrl).toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async getUser(): Promise<any> {
        try {
            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }

            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async updateUser(data: any): Promise<any> {
        try {
            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            // console.log(client)
            const { error } = await client.data.auth.updateUser(data)
            // console.log(error)
            if (error) {            
                return new FailedResult(error).toObjectWithMerge({ status: 400 })
            }

            return new SuccessfulResult().toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async logOutUser(): Promise<any> {
        try {
            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            // console.log(client)
            const { error } = await client.data.auth.signOut()
            // console.log(error)
            if (error) {            
                return new FailedResult(error).toObjectWithMerge({ status: 400 })
            }

            return new SuccessfulResult().toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async getAnonymousUserClient(): Promise<any> {
        try {
            let client: any = this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }

            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }   
    }

    public async logInUserViaEmailAndPassword(email: any, password: any): Promise<any> {
        try {
            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            const authenticationResult: any = await client.data.auth.signInWithPassword({ email, password })
            if (authenticationResult.error) {
                return new FailedResult(authenticationResult.error).toObjectWithMerge({ status: authenticationResult.status || 500 })
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async createUserViaEmailAndPassword(email: any, password: any): Promise<any> {
        try {
            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            const { data: signUpData, error } = await client.data.auth.signUp({ email, password })
            if (error) {
                return new FailedResult(error).toObjectWithMerge({ status: error.status })
            }
            return new SuccessfulResult(signUpData).toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async readOne(
        databaseTableName: string,
        routerParameters: any,
        queryStringParameters: any,
        callback: any = (client: any): any => { return client }): Promise<any> {
        try {
            SupabaseAPI._throwIfUndefinedOrNull(databaseTableName)
            SupabaseAPI._throwIfUndefinedOrNull(routerParameters)

            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = this.supabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName)
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = this.supabaseDatabase.parseQueryStringParameterSelectedColumns(client.data, queryStringParameters)
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = client.data
            for (let routerParameter in routerParameters) {
                client = client.eq(routerParameter, routerParameters[routerParameter])
            }
            client = callback(client)
            client = client.eq('is_hidden', false)
            client = (await this.supabaseDatabase.executeClient(client)).data

            if (!client.data) {
                return new FailedResult(client).toObjectWithMerge({ status: client.status })
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async readMany(
        databaseTableName: string,
        queryStringParameters: any,
        callback: any = (client: any): any => { return client }): Promise<any> {
        try {
            SupabaseAPI._throwIfUndefinedOrNull(databaseTableName)

            let client: any = this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = this.supabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName)
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = this.supabaseDatabase.parseQueryStringParameterSelectedColumns(client.data, queryStringParameters)
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = this.supabaseDatabase.parseQueryStringParameterOrderedColumns(client.data, queryStringParameters)
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = this.supabaseDatabase.parseQueryStringParameterSelectedRowRange(client.data, queryStringParameters)
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = client.data
            client = callback(client)
            client = client.eq('is_hidden', false)
            client = (await this.supabaseDatabase.executeClient(client)).data
            
            if (!client.data) {
                return new FailedResult(client).toObjectWithMerge({ status: client.status })
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async customQuery(
        databaseTableName: string,
        callback: any = (client: any): any => { return client }): Promise<any> {
        try {
            SupabaseAPI._throwIfUndefinedOrNull(databaseTableName)

            let client: any = this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = this.supabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName)
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            
            client = client.data
            client = callback(client)
            client = client.eq('is_hidden', false)
            client = (await this.supabaseDatabase.executeClient(client))
            
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: client.status })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async createOne(
        idempotencyKey: string,
        databaseTableName: string,
        bodyParameters: any = {},
        callback: any = (client: any): any => { return client }): Promise<any> {
        try {
            if (this._idempotencyKeys.has(idempotencyKey)) {
                return new FailedResult("REST API is still busy").toObjectWithMerge({ status: 429 })
            }
            this._idempotencyKeys.add(idempotencyKey)

            SupabaseAPI._throwIfUndefinedOrNull(idempotencyKey)
            SupabaseAPI._throwIfUndefinedOrNull(databaseTableName)

            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = this.supabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName)
            if (!client.isSuccessful) {
                return this._handleIdempotentResult(idempotencyKey, new FailedResult(client).toObjectWithMerge({ status: 400 }))
            }
            client = client.data
            client = client.insert({
                ...bodyParameters['data'],
                timestamp_created: new Date().toISOString(),
                timestamp_modified: new Date().toISOString(),
                is_hidden: false
            })
            client = callback(client)
            client = client.select()
            client = (await this.supabaseDatabase.executeClient(client)).data
            if (client.status !== 201) {
                return this._handleIdempotentResult(idempotencyKey, new FailedResult(client).toObjectWithMerge({ status: client.status }))
            }
            return this._handleIdempotentResult(idempotencyKey, new SuccessfulResult(client.data).toObjectWithMerge({ status: 201 }))

        } catch (error: any) {
            return this._handleIdempotentResult(idempotencyKey, new FailedResult(error.message).toObjectWithMerge({ status: 500 }))
        }
    }

    public async updateOne(
        databaseTableName: string,
        routerParameters: any,
        bodyParameters: any,
        callback: any = (client: any): any => { return client }): Promise<any> {
        try {
            SupabaseAPI._throwIfUndefinedOrNull(databaseTableName)
            SupabaseAPI._throwIfUndefinedOrNull(routerParameters)

            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = this.supabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName)
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = client.data
            client = client.update({ ...bodyParameters['data'], timestamp_modified: new Date().toISOString() })
            for (let routerParameter in routerParameters) {
                client = client.eq(routerParameter, routerParameters[routerParameter])
            }
            client = callback(client)
            client = (await this.supabaseDatabase.executeClient(client)).data
            if (client.status !== 204) {
                return new FailedResult(client).toObjectWithMerge({ status: client.status })
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    public async deleteOne(
        databaseTableName: string,
        routerParameters: any,
        callback: any = (client: any): any => { return client }): Promise<any> {
        try {
            SupabaseAPI._throwIfUndefinedOrNull(databaseTableName)
            SupabaseAPI._throwIfUndefinedOrNull(routerParameters)

            let client: any = await this.supabaseDatabase.getClient()
            if (!client.isSuccessful) {            
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = this.supabaseDatabase.fromBaseSchemaTable(client.data, databaseTableName)
            if (!client.isSuccessful) {
                return new FailedResult(client).toObjectWithMerge({ status: 400 })
            }
            client = client.data
            client = client.delete()
            for (let routerParameter in routerParameters) {
                client = client.eq(routerParameter, routerParameters[routerParameter])
            }
            client = callback(client)
            client = (await this.supabaseDatabase.executeClient(client)).data
            if (client.status !== 204) {
                return new FailedResult(client).toObjectWithMerge({ status: client.status })
            }
            return new SuccessfulResult(client.data).toObjectWithMerge({ status: 200 })

        } catch (error: any) {
            return new FailedResult(error.message).toObjectWithMerge({ status: 500 })
        }
    }

    private _handleIdempotentResult(idempotencyKey: string, result: any): any {
        this._idempotencyKeys.delete(idempotencyKey)
        return result
    }

    private static _throwIfUndefinedOrNull(value: any): void {
        if (value === undefined || value === null) {
            throw new Error('undefined or null values are invalid')
        }
    }
}
