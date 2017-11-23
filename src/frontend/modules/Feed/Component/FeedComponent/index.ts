import {AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, Output, QueryList, ViewChildren} from '@angular/core';
import * as scrollIntoView from 'scroll-into-view';

import {Feed} from "../../Entity/Feed";
import {PostComponent} from "../../../Post/Component/Post/index";
import {PostHotkeys} from "../../../Post/Component/Post/hotkeys";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";
import {ActivatedRoute} from "@angular/router";
import {FeedCacheService} from "../../Service/FeedCacheService";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'feed',
    templateUrl: './template.pug',
    styleUrls: ["./style.shadow.scss"]
})

export class FeedComponent implements AfterViewInit, OnDestroy {
    @Input() feed: Feed;
    @Output() onFeedEnd = new EventEmitter<number>();
    @ViewChildren(PostComponent) posts: QueryList<PostComponent>;

    private currentPostComponent: PostComponent;
    private scrollSubscription: Subscription;

    constructor(
        public route: ActivatedRoute,
        public feedCacheService: FeedCacheService,
        public appScrollService: ApplicationScrollService
    ) {
        setTimeout(() => { // Без этого костыля скролл не отрабатывает на странице профиля по нажатию на back d баузере.
            try {
                this.appScrollService.scrollTo(
                    this.feedCacheService.getScroll(this.route.snapshot.data.feedRequest)
                );
                
            } catch (e) {
                this.appScrollService.scrollTo(0);
            }
        }, 0);
    }
    
    ngAfterViewInit() {
        this.posts.forEach(post => post.current = false);
        this.scrollSubscription = this.appScrollService
            .onScroll
            .debounceTime(50)
            .subscribe((scroll) => {

                this.feedCacheService.saveScroll(this.route.snapshot.data.feedRequest, scroll);

                this.posts.forEach(post => post.current = false);
                this.currentPostComponent = this.posts.find(post => post.isIntoView == true);

                if (this.currentPostComponent) {
                    this.currentPostComponent.current = true;
                }

                if (typeof window != 'undefined' && this.feed.length > 0) {
                    if (this.appScrollService.mainHeight + this.appScrollService.scrollHeight - scroll < 2000) {
                        this.onFeedEnd.emit(this.feed.slice(-1).pop().id);
                    }
                }
            })
        ;
    }

    ngOnDestroy() {
        this.scrollSubscription.unsubscribe();
    }

    @HostListener('window:keyup', ['$event.keyCode'])
    onKeydown(keyCode: number) {
        if (keyCode == PostHotkeys.NextPost || keyCode == PostHotkeys.PreviousPost) {
            let postEl = this.posts.first.el.nativeElement;

            if (this.currentPostComponent) {
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