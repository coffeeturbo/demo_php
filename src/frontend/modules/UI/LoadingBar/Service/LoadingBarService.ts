import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {LoadingBarEvents} from "../Event/LoadingBarEvents";
import {LoaderBar, LoaderBarState} from "../Entity/LoaderBar";
import {LoadingBarSubscriptions} from "../Subscription/LoadingBarSubscriptions";

@Injectable()
export class LoadingBarService {

    private loaderBar: LoaderBar = {
        progress: 0, 
        state: LoaderBarState.Inactive
    };

    constructor(
        private event: LoadingBarEvents,
        private subscription: LoadingBarSubscriptions
    ) {
        this.event.onChangeProgress.subscribe((loaderBar: LoaderBar) => {
            if (loaderBar.progress > 0)
                this.activate();

            if (loaderBar.progress == 100)
                this.event.onCompleteProgress.emit(loaderBar);

            if (loaderBar.progress == 0)
                this.event.onResetProgress.emit(loaderBar);

        });

        this.event.onCompleteProgress.subscribe(() => {
            this.subscription.completeProgressSubscription.unsubscribe();

            this.subscription.completeProgressSubscription = Observable
                .interval(300)
                .take(2).subscribe((step: number) => {
                    switch (step) {
                        case 0:
                            this.deactivate();
                            break;
                        case 1:
                            this.resetProgress();
                            break;
                    }
                });
        });
    }

    public setProgress(progress: number) {
        this.loaderBar.progress = progress;
        this.event.onChangeProgress.emit(this.get());
    }

    public incProgress() {
        this.setProgress(this.get().progress + 1);
    }

    public completeProgress() {
        this.stopProgress();
        this.setProgress(100);
    }

    public resetProgress() {
        this.stopProgress();
        this.deactivate();
        this.setProgress(0);
    }

    public startProgress(duration = 500) {
        this.stopProgress();
        this.incProgress();
        this.subscription.startProgressSubscription = Observable
            .interval(duration)
            .take(100 - this.get().progress)
            .subscribe(() => this.incProgress());
    }

    public stopProgress() {
        this.subscription.startProgressSubscription.unsubscribe();
    }

    public activate() {
        this.loaderBar.state = LoaderBarState.Active;
        this.event.onChangeState.emit(this.get());
    }

    public deactivate() {
        this.loaderBar.state = LoaderBarState.Inactive;
        this.event.onChangeState.emit(this.get());
    }

    public get(): LoaderBar {
        return this.loaderBar;
    }
}