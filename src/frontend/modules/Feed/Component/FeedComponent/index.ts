import {Component, HostListener, Input, QueryList, ViewChildren} from '@angular/core';
import * as scrollIntoView from 'scroll-into-view';

import {Feed} from "../../Entity/Feed";
import {PostComponent} from "../../../Post/Component/Post/index";
import {PostHotkeys} from "../../../Post/Component/Post/hotkeys";

@Component({
    selector: 'feed',
    templateUrl: './template.pug',
    styleUrls: ["./style.shadow.scss"]
})

export class FeedComponent {
    @Input() feed: Feed;
    @ViewChildren(PostComponent) posts: QueryList<PostComponent>;

    @HostListener('window:keyup', ['$event.keyCode'])
    onKeydown1(keyCode: number) {
        if(keyCode == PostHotkeys.NextPost || keyCode == PostHotkeys.PreviousPost) {
            let postComponent: PostComponent = this.posts.find(post => post.isIntoView == true);
            let postEl = this.posts.first.el.nativeElement;
        
            if(postComponent) {
                switch (keyCode) {
                    case PostHotkeys.NextPost:
                        postEl = postComponent.el.nativeElement.nextElementSibling;
                        break;
                    case PostHotkeys.PreviousPost:
                        postEl = postComponent.el.nativeElement.previousElementSibling;
                        break;
                }
            }

            scrollIntoView(postEl, {
                time: 100,
                align: {top: 0, topOffset: 20}
            });
        }
    }
}