import {Injectable} from '@angular/core';

import {Provider} from "../Entity/Provider";
import {Observable} from "rxjs";
import {TokenResponse} from "../Http/Response/TokenResponse";
import {Config} from "../../../app/config";

@Injectable()
export class OAuthService 
{
    public connectVK(): Observable<TokenResponse>
    {
        return this.connect("vk");
    }

    public connectFacebook(): Observable<TokenResponse>
    {
        return this.connect("facebook");
    }

    public connect(provider: Provider): Observable<any>
    {
        let url = `/oAuth/connect/${provider}`;
        let connectWindow: Window = window.open(Config.uri.api + url, null, "menubar=no,toolbar=no,location=no,width=600,height=600");

        return Observable.merge(
            Observable.fromEvent(connectWindow.opener, "message")
                .map((event: MessageEvent) => event.data)
                .do(() => connectWindow.close()),

            Observable.interval(100)
                .filter(() => connectWindow && connectWindow.closed)
                .flatMap(() => Observable.throw({"code": 410, "message": "Authorization aborted"}))
        )
        .first();
    }
}