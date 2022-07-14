export class Http {

    constructor(private httpClient: any) {
        this.httpClient = httpClient
    }

    doAjax(method: string, url: string, params: object[], headers: object, data?: object) : Promise<Response>{
        return this.httpClient.doAjax(method, url, params, headers, data)
    }
}