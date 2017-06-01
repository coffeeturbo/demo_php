import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {
    Http,
    XHRBackend,
    RequestOptions,
    Request,
    RequestOptionsArgs,
    Response
} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {AuthHttp} from "angular2-jwt/angular2-jwt";

const API_PATH = require('../../../app/config.json').uri.api;

@Injectable()
export class RESTService extends Http
{
    constructor (backend: XHRBackend, options: RequestOptions, public authHttp: AuthHttp) 
    {
        super(backend, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> 
    {
        if(url instanceof Request) {
            url.url = API_PATH + url.url;  
        } else {
            url = API_PATH + url;
        }

        return super.request(url, options).catch((error: Response)  => {
            try {
                error = error.json();
            } catch(e){}
            
            return Observable.throw(error);
        });
    }
}