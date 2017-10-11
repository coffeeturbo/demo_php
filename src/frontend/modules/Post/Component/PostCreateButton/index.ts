import {Component, HostBinding, HostListener} from '@angular/core';
import {Router} from "@angular/router";

import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";

@Component({
    selector: 'post-create-button',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class PostCreateButtonComponent {
    @HostBinding('class.hidden')
    get isHidden () {
        return this.appScrollService.getScroll() > 300 || this.appScrollService.getScrollSavedPosition();
    }
    
    @HostListener('click')
    public addPost() {
        this.router.navigate(["post", "add"]);
    }

    constructor(
        private appScrollService: ApplicationScrollService,
        private router: Router
    ) {}
}