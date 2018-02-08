import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";
import {AuthService} from "../../../Auth/Service/AuthService";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class PostRoute {

    @ViewChild('commentsEl') commentsEl: ElementRef;
    public orderCommentsBy: "rate" | "date" = "date";
    
    constructor(
        public route: ActivatedRoute, 
        private applicationScrollService: ApplicationScrollService,
        public auth: AuthService
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