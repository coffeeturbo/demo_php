import {Directive, HostBinding} from '@angular/core';
import {LoadingBarEvents} from "../Event/LoadingBarEvents";
import {LoaderBar, LoaderBarState} from "../Entity/LoaderBar";

@Directive({
    selector: '[loading-bar]'
})
export class LoadingBarDirective {
    @HostBinding('style.width.%') width: number = 0;
    @HostBinding('style.opacity') opacty: number = 0;

    constructor(loadingBarEvents: LoadingBarEvents) {
        loadingBarEvents.onChangeProgress
            .map((loaderBar: LoaderBar) => loaderBar.progress)
            .subscribe((progress: number) => this.width = progress);

        loadingBarEvents.onChangeState
            .map((loaderBar: LoaderBar) => loaderBar.state)
            .subscribe((state: LoaderBarState) => this.opacty = state)
    }
}