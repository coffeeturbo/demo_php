import {Component, HostListener, Input, QueryList, ViewChildren} from '@angular/core';
import * as scrollIntoView from 'scroll-into-view';

import {Feed} from "../../Entity/Feed";
import {PostComponent} from "../../../Post/Component/Post/index";

@Component({
    selector: 'feed',
    templateUrl: './template.pug',
    styleUrls: ["./style.shadow.scss"]
})

export class FeedComponent {
    @Input() feed: Feed;
    @ViewChildren(PostComponent) posts: QueryList<PostComponent>;

    @HostListener('window:keydown', ['$event'])
    nextElementSibling(e: KeyboardEvent) {
        if (e.code == "KeyD" || e.code == "KeyA") {

            let postComponent: PostComponent = this.posts.find(post => post.isIntoView == true);

            let postEl = this.posts.first.el.nativeElement;

            if (postComponent) {
                if (e.code == "KeyD") {
                    postEl = postComponent.el.nativeElement.nextElementSibling;
                }
                if (e.code == "KeyA") {
                    postEl = postComponent.el.nativeElement.previousElementSibling;
                }
            }
            
            scrollIntoView(postEl, {
                time: 100,
                align: {top: 0, topOffset: 20}
            });
        }
    }
}