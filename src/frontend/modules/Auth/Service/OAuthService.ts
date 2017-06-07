import {Injectable} from '@angular/core';

import {Provider} from "../Entity/Provider";
import {Observable, Observer} from "rxjs";
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

    public connect(provider: Provider): Observable<TokenResponse>
    {
        let url = `/oAuth/connect/${provider}`;

        return new Observable((observer: Observer<TokenResponse>) => {
            let connectWindow: Window = window.open(Config.uri.api + url, null, "menubar=no,toolbar=no,location=no");

            let connectWindowSubscription = Observable.interval(100)
                .subscribe(() => {
                    if (connectWindow && connectWindow.closed) {
                        connectWindowSubscription.unsubscribe();
                        observer.error({"code": 410, "message": "Authorization aborted"});
                    }
                })
            ;

            connectWindow.opener.onmessage = (event: MessageEvent) => {
                connectWindowSubscription.unsubscribe();
                connectWindow.close();
                observer.next(event.data);
                observer.complete();
            }
        })
    }
}