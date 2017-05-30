import {Injectable} from "@angular/core";
import {Client} from "thruway.js";
import {Observable} from "rxjs";

const WS_PATH = require('../../../app/config.json').uri.websocket;
    
@Injectable()
export class WebSocketService extends Client
{
    constructor() {
        super('ws://' + location.host + WS_PATH, 'jet_ws');
    }

    subscribeToTestTopic() {
        let observable: Observable<any> = this.topic("ru.socilite.jet.test");
        observable.map((r: any) => r.args[0]).subscribe((e) => console.log(e));
        
        return observable;
    }
}