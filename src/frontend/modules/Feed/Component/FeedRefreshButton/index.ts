import {Component, Host, HostBinding, HostListener} from '@angular/core';
import {Observable} from "rxjs";

import {FeedComponent} from "../Feed";

@Component({
    selector: 'feed-refresh-button',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class FeedRefreshButtonComponent {

    @HostBinding('class.progress')
    public inProgress = false;

    @HostBinding('class.complete')
    get isComplete() {
        return this.inProgress && this.isLoading == false;
    }

    @HostBinding('class.loading')
    get isLoading() {
        return this.feedComponent.isLoading;
    }

    constructor(@Host() public feedComponent: FeedComponent) {}
    
    @HostListener('click')
    emitRefresh() {
        if(!this.inProgress) {
            this.inProgress = true;
            this.feedComponent.onRefresh.emit();
        }

        Observable.timer(100, 0)
            .filter(() => !this.isLoading)
            .take(1)
            .delay(1000)
            .subscribe(() => this.inProgress = false)
        ;
    }
}