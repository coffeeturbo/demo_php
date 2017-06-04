import {EventEmitter, Injectable} from "@angular/core";

import {LoaderBar} from "../Entity/LoaderBar";

@Injectable()
export class LoadingBarEvents {
    public onChangeProgress = new EventEmitter<LoaderBar>();
    public onCompleteProgress = new EventEmitter<LoaderBar>();
    public onResetProgress = new EventEmitter<LoaderBar>();
    public onChangeState = new EventEmitter<LoaderBar>();
}