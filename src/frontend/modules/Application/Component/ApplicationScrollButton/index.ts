import {Component, HostBinding, HostListener} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {ApplicationScrollService} from "../../Service/ApplicationScrollService";

@Component({
    selector: 'application-scroll-button',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ApplicationScrollButtonComponent {

    @HostBinding('class.hidden')
    get isHidden () { 
        return this.appScrollService.getScroll() < 1000 && !this.appScrollService.getScrollSavedPosition(); 
    }

    @HostBinding('class.flipped')
    get isFlipped () { 
        return this.appScrollService.getScrollSavedPosition() > 0; 
    }
    
    @HostListener('click')
    public scroll() {
        this.isProgrammScroll = true;
        setTimeout(() => this.isProgrammScroll = false, 100);
        let savedScrollPosition = this.appScrollService.getScroll();
        this.appScrollService.scrollTo(this.appScrollService.getScrollSavedPosition());
        this.appScrollService.saveScrollPosition(savedScrollPosition);
    }
    
    private isProgrammScroll: boolean = false;

    constructor(private appScrollService: ApplicationScrollService) {
        appScrollService
            .onScroll
            .debounceTime(50)
            .filter(()=> !this.isProgrammScroll)
            .subscribe(() => {
                this.appScrollService.clearScrollPosition()
            })
        ;
    }
}