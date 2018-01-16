import {Component, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class PostRoute {

    @ViewChild('commentsEl') commentsEl: ElementRef;

    constructor(
        public route: ActivatedRoute, 
        private applicationScrollService: ApplicationScrollService
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
        }, 0);
    }
}