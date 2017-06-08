import {Injectable, Optional} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http, Request, RequestOptions, RequestOptionsArgs, Response, XHRBackend} from "@angular/http";
import {RESTServiceConfig} from "./RESTServiceConfig";

@Injectable()
export class RESTService extends Http
{
    private path: string = "";

    constructor(backend: XHRBackend, options: RequestOptions, @Optional() config: RESTServiceConfig) {
        super(backend, options);
        this.path = config.path;
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