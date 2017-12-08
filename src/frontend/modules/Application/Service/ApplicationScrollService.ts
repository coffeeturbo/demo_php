import {ElementRef, EventEmitter, Injectable} from "@angular/core";
import * as smoothScroll from 'scroll';

@Injectable()
export class ApplicationScrollService {
    private savedPosition: number;
    private scroll: number = 0;
    private el: ElementRef;

    public onScroll = new EventEmitter<number>();
    public mainHeight: number = 0;

    get scrollHeight() {
        return this.el.nativeElement.scrollHeight;
    }

    public scrollTo(scroll: number, smooth: boolean = false) {
        // Не давать уходить в минусовой скролл и не скроллить больше максимума
        this.scroll = Math.max(0, Math.min(scroll, this.scrollHeight - this.mainHeight));
        
        if(smooth) {
            let inOutCube = function(n){
                n *= 2;
                if (n < 1) return 0.5 * n * n * n;
                return 0.5 * ((n -= 2 ) * n * n + 2);
            };

            smoothScroll.top(this.el.nativeElement, scroll, {duration: 350, ease: inOutCube})
            
        } else {
            this.onScroll.emit(this.scroll);
        }
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