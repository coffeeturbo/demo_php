import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from "@angular/http";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

import {Config} from "../../../app/config";

@Injectable()
export class RESTService extends Http
{
    private path: string = Config.uri.api;

    constructor(backend: XHRBackend, options: RequestOptions, public authHttp: AuthHttp) {
        super(backend, options);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>
    {
        if (url instanceof Request) {
            url.url = this.path + url.url;
        } else {
            url = this.path + url;
        }

        return super.request(url, options).catch((error: Response) => {
            try {
                error = error.json();
            } catch (e) {}

            return Observable.throw(error);
        });
    }
}