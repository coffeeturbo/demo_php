import {Component, ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';

import {SidebarService} from "../../../Sidebar/Service/SidebarService";
import {ApplicationScrollService} from "../../Service/ApplicationScrollService";

@Component({
    selector: 'application-main',
    template: '<router-outlet></router-outlet>',
    styleUrls: ['./style.shadow.scss']
})

export class ApplicationMainFrameComponent implements OnInit {

    @HostBinding('class')
    get getClass() {
        return "sidebar-" + this.sidebar.state;
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

    @HostListener('scroll', ['$event'])
    public onScroll($event) {
        this.appScrollService.scrollTo($event.target.scrollTop);
    }

    @HostListener('window:resize')
    ngOnInit() {
        if (typeof window != 'undefined') {
            this.appScrollService.mainHeight = window.innerHeight - this.el.nativeElement.offsetTop;
        }
        
        this.appScrollService.setMainElement(this.el);
    }
}