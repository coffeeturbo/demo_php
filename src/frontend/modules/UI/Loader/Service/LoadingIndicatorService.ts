import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class LoadingBarService {
    private progress: number = 0;
    private startProgressSubscription: Subscription = new Subscription();
    private completeProgressSubscription: Subscription = new Subscription();
    private opacity: number = 0;

    private onChangeProgressEvent = new EventEmitter();
    private onCompleteProgressEvent = new EventEmitter();

    constructor() {
        this.onChangeProgressEvent.subscribe((progress: number) => {
            if (progress > 0) this.show();
        });

        this.onCompleteProgressEvent.subscribe(() => {
            this.completeProgressSubscription.unsubscribe();

            this.completeProgressSubscription = Observable
                .interval(300)
                .take(2).subscribe((step: number) => {
                    switch (step) {
                        case 0:
                            this.hide();
                            break;
                        case 1:
                            this.resetProgress();
                            break;
                    }
                });

        });

    }

    public setProgress(progress: number) {
        this.progress = progress;
        this.onChangeProgressEvent.emit(progress);

        if (this.progress == 100) {
            this.onCompleteProgressEvent.emit(this.progress);
        }
    }

    public getProgress(): number {
        return this.progress;
    }

    public incProgress() {
        this.setProgress(this.progress + 1);
    }

    public completeProgress() {
        this.stopProgress();
        this.setProgress(100);
    }

    public resetProgress() {
        this.stopProgress();
        this.hide();
        this.setProgress(0);
    }

    public startProgress(duration = 500) {
        this.stopProgress();
        this.incProgress();
        this.startProgressSubscription = Observable
            .interval(duration)
            .take(100 - this.progress)
            .subscribe(() => this.incProgress());
    }

    public stopProgress() {
        this.startProgressSubscription.unsubscribe();
    }

    private show() {
        this.setOpacity(1);
    }

    private hide() {
        this.setOpacity(0);
    }

    public setOpacity(opacity: number) {
        this.opacity = opacity;
    }

    public getOpacity(): number {
        return this.opacity;
    }
}