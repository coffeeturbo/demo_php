import {EventEmitter, Injectable} from '@angular/core';
import {LoaderBar} from "../Entity/LoaderBar";

@Injectable()
export class LoadingBarEvents {
    public onChangeProgress: EventEmitter<LoaderBar> = new EventEmitter();
    public onCompleteProgress: EventEmitter<LoaderBar> = new EventEmitter();
    public onResetProgress: EventEmitter<LoaderBar> = new EventEmitter();
    public onChangeState: EventEmitter<LoaderBar> = new EventEmitter();
}