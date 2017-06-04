import {Injectable} from "@angular/core";
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

    public setProgress(progress: number): void {
        this.loaderBar.progress = progress;
        this.event.onChangeProgress.emit(this.getLoaderBar);
    }

    public incProgress(): void {
        this.setProgress(this.getLoaderBar.progress + 1);
    }

    public completeProgress(): void {
        this.stopProgress();
        this.setProgress(100);
    }

    public resetProgress(): void {
        this.stopProgress();
        this.deactivate();
        this.setProgress(0);
    }

    public startProgress(duration = 500): void {
        this.stopProgress();
        this.incProgress();
        this.subscription.startProgressSubscription = Observable
            .interval(duration)
            .take(100 - this.getLoaderBar.progress)
            .subscribe(() => this.incProgress());
    }

    public stopProgress(): void {
        this.subscription.startProgressSubscription.unsubscribe();
    }

    public activate(): void {
        this.loaderBar.state = LoaderBarState.Active;
        this.event.onChangeState.emit(this.getLoaderBar);
    }

    public deactivate(): void {
        this.loaderBar.state = LoaderBarState.Inactive;
        this.event.onChangeState.emit(this.getLoaderBar);
    }

    public get getLoaderBar(): LoaderBar {
        return this.loaderBar;
    }
}