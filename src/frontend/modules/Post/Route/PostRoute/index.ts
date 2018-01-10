import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Post} from "../../Entity/Post";
import {ActivatedRoute} from "@angular/router";
import {Comment} from "../../../Comment/Entity/Comment";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";

@Component({
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class PostRoute implements OnInit {

    @ViewChild('commentsEl') commentsEl: ElementRef;

    public post: Post;
    public comments: Comment[];

    constructor(
        private route: ActivatedRoute, 
        private applicationScrollService: ApplicationScrollService
    ) {
        this.route.fragment.subscribe(fragment => {
            switch(fragment) {
                case "comments" : 
                    this.applicationScrollService.scrollTo(this.commentsEl.nativeElement.offsetTop, true);
                break;
                default : this.applicationScrollService.scrollTo(0, true);
            }
        });
    }

    ngOnInit() {
        this.post = this.route.snapshot.data.post;
        this.comments = this.route.snapshot.data.comments;
    }
}