import { HttpClient, HttpXhrBackend, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { RequestOptions } from 'http';
import { Observable } from 'rxjs';

@Injectable()
export class BTHttpClient extends HttpClient {
    constructor(backend: HttpXhrBackend, defaultOptions: RequestOptions) { 
        super(backend)
    }

    public request(url: string | Request, options?: RequestOptionsArgs): Observable<HttpResponse> {
        return super.request(url, options)
    }
}