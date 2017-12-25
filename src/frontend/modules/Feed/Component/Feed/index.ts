import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output, QueryList, ViewChildren} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";
import {PostComponent} from "../../../Post/Component/Post/index";
import {PostHotkeys} from "../../../Post/Component/Post/hotkeys";
import {FeedCacheService} from "../../Service/FeedCacheService";
import {Feed} from "../../Entity/Feed";

@Component({
    selector: 'feed',
    templateUrl: './template.pug',
    styleUrls: ["./style.shadow.scss"]
})

export class FeedComponent implements AfterViewInit, OnDestroy {
    @Input() feed: Feed;
    @Input() isLoading: boolean;
    @Input() showRefresh: boolean = false;
    @Output() onRefresh = new EventEmitter<void>();
    @Output() onFeedLoad = new EventEmitter<number>();
    @ViewChildren(PostComponent) postComponents: QueryList<PostComponent>;

    private currentPostComponent: PostComponent;
    private scrollSubscription: Subscription;

    constructor(
        public route: ActivatedRoute,
        public feedCacheService: FeedCacheService,
        public appScrollService: ApplicationScrollService
    ) {
        setTimeout(() => { // Без этого костыля скролл не отрабатывает на странице профиля по нажатию на back в баузере.
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
        this.postComponents.forEach(post => post.current = false);
        this.scrollSubscription = this.appScrollService
            .onScroll
            .debounceTime(50)
            .delay(10)
            .subscribe(scroll => {

                this.feedCacheService.saveScroll(this.route.snapshot.data.feedRequest, scroll);

                this.currentPostComponent = this.postComponents.find(post => post.isIntoView == true);

                if (this.currentPostComponent) {
                    this.postComponents.forEach(post => post.current = false);
                    this.currentPostComponent.current = true;
                }

                if (this.feed.length > 0) {
                    if (this.appScrollService.mainHeight + this.appScrollService.scrollHeight - scroll < 5000) {
                        this.onFeedLoad.emit(this.feed.slice(-1).pop().id);
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
            let postComponents: PostComponent[] = this.postComponents.toArray();
            let index = 0;

            if (this.currentPostComponent) {
                index = this.postComponents.toArray().indexOf(this.currentPostComponent);

                switch (keyCode) {
                    case PostHotkeys.NextPost:
                        index++;
                        break;
                    case PostHotkeys.PreviousPost:
                        index--;
                        break;
                }
            }

            if(postComponents[index]) {
                this.postComponents.map((postCompontent, i) => {
                    postCompontent.current = i == index;
                    return postCompontent;
                });

                this.currentPostComponent = this.postComponents.find(postComponent => postComponent.current);
                
                let postEl = postComponents[index].el.nativeElement;
                this.appScrollService.scrollTo(postEl.offsetTop, true);
            }
        }
    }
}