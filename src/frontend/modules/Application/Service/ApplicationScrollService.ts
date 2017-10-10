import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class ApplicationScrollService {
    private savedPosition: number;
    private scroll: number = 0;
    public onScroll = new EventEmitter<number>();
    
    public scrollTo(scroll: number) {
        this.scroll = scroll;
        this.onScroll.emit(scroll)
    }

    public getScroll(): number {
        return this.scroll;
    }
    
    public getScrollSavedPosition() {
        return this.savedPosition;
    }
    
    public saveScrollPosition(scroll: number) {
        this.savedPosition = scroll;
    }
    
    public clearScrollPosition() {
        this.savedPosition = undefined;
    }
    
}