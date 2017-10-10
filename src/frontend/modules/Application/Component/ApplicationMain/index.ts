import {Component, ElementRef, HostBinding, HostListener} from '@angular/core';

import {SidebarService} from "../../../Sidebar/Service/SidebarService";
import {ApplicationScrollService} from "../../Service/ApplicationScrollService";

@Component({
    selector: 'application-main',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./style.shadow.scss']
})

export class ApplicationMainFrameComponent {

    @HostBinding('class') 
    get getClass () {
        return "sidebar-" + this.sidebar.state; 
    }

    @HostListener('scroll', ['$event'])
    public onScroll($event) {
        this.appScrollService.scrollTo($event.target.scrollTop);
    }
    
    constructor(
        public sidebar: SidebarService,
        public appScrollService: ApplicationScrollService,
        public el: ElementRef
    ) {
        this.appScrollService
            .onScroll
            .subscribe(scrollTop => this.el.nativeElement.scrollTop = scrollTop)
        ;
    }
}