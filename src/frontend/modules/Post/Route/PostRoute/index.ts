import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";
import {AuthService} from "../../../Auth/Service/AuthService";
import {AuthModalsService} from "../../../Auth/Service/AuthModalsService";
import {AuthModals} from "../../../Auth/Entity/AuthModals";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class PostRoute {

    @ViewChild('commentsEl') commentsEl: ElementRef;
    public AuthModals = AuthModals;
    public orderCommentsBy: "rate" | "date" = "date";
    
    constructor(
        public route: ActivatedRoute, 
        private applicationScrollService: ApplicationScrollService,
        public auth: AuthService,
        public authModalsService: AuthModalsService,
    ) {
        
        setTimeout(() => {
            this.route.fragment.subscribe(fragment => {
                switch (fragment) {
                    case "comments" :
                        this.applicationScrollService.scrollTo(this.commentsEl.nativeElement.offsetTop, true);
                        break;
                    default :
                        this.applicationScrollService.scrollTo(0);
                }
            });
        }, 10);
    }
}