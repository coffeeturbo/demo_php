import {Injectable} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class LoadingBarSubscriptions {
    public startProgressSubscription: Subscription = new Subscription();
    public completeProgressSubscription: Subscription = new Subscription();
}