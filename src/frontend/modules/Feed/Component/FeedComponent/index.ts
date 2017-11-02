import {Component, HostListener, Input, QueryList, ViewChildren} from '@angular/core';
import * as scrollIntoView from 'scroll-into-view';

import {Feed} from "../../Entity/Feed";
import {PostComponent} from "../../../Post/Component/Post/index";
import {PostHotkeys} from "../../../Post/Component/Post/hotkeys";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";

@Component({
    selector: 'feed',
    templateUrl: './template.pug',
    styleUrls: ["./style.shadow.scss"]
})

export class FeedComponent {
    @Input() feed: Feed;
    @ViewChildren(PostComponent) posts: QueryList<PostComponent>;
    
    private currentPostComponent: PostComponent;
    
    constructor(public appScrollService: ApplicationScrollService){}
    
    ngAfterViewInit() {
        this.posts.forEach(post => post.current = false);
        this.appScrollService
            .onScroll
            .debounceTime(50)
            .subscribe(() => {
                this.posts.forEach(post => post.current = false);
                this.currentPostComponent = this.posts.find(post => post.isIntoView == true);
                if(this.currentPostComponent) {
                    this.currentPostComponent.current = true;
                }
            })
        ;
    }
    
    @HostListener('window:keyup', ['$event.keyCode'])
    onKeydown(keyCode: number) {
        if(keyCode == PostHotkeys.NextPost || keyCode == PostHotkeys.PreviousPost) {
            let postEl = this.posts.first.el.nativeElement;
            
            if(this.currentPostComponent) {
                switch (keyCode) {
                    case PostHotkeys.NextPost:
                        postEl = this.currentPostComponent.el.nativeElement.nextElementSibling;
                        break;
                    case PostHotkeys.PreviousPost:
                        postEl = this.currentPostComponent.el.nativeElement.previousElementSibling;
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