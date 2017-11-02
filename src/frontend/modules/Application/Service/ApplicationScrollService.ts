import {ElementRef, EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class ApplicationScrollService {
    private savedPosition: number;
    private scroll: number = 0;
    private el: ElementRef;

    public onScroll = new EventEmitter<number>();
    public mainHeight: number = 0;
    
    public scrollTo(scroll: number) {
        // Не давать уходить в минусовой скролл и не скроллить дальше самого элемента
        this.scroll = Math.max(0, Math.min(scroll, this.el.nativeElement.scrollHeight - this.mainHeight));
        this.onScroll.emit(this.scroll);
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
    
    public setMainElement(el: ElementRef) {
        this.el = el;
    }
}