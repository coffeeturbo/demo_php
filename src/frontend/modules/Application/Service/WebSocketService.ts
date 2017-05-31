import {Injectable} from "@angular/core";
import {Client} from "thruway.js";
import {Observable} from "rxjs";
import {TokenRepository} from "../../Auth/Repository/TokenRepository";
import {Observer} from "rxjs/Observer";

const WS_PATH = require('../../../app/config.json').uri.websocket;
    
@Injectable()
export class WebSocketService extends Client
{
    constructor() {
        super('ws://' + location.host + WS_PATH, 'jet_ws', {
            authmethods: ["jwt"]
        });
        
        this.onChallenge(()=> Observable.create((observer: Observer<string>)=>{
                observer.next(TokenRepository.getToken());
                observer.complete();
            })
        );
    }

    subscribeToTestTopic() {
        let observable: Observable<any> = this.topic("ru.socilite.jet.test");
        observable.map((r: any) => r.args[0]).subscribe((e) => console.log(e));
        
        return observable;
    }
}