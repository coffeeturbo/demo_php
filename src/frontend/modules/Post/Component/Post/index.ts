import {
    AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit,
    Renderer2
} from '@angular/core';
import {Router} from "@angular/router";
import {TranslationService} from "@angular-addons/translate";
import * as getSlug from "speakingurl";
import * as scrollIntoView from 'scroll-into-view';

import {PostHotkeys} from "./hotkeys";
import {Post} from "../../Entity/Post";
import {PostService} from "../../Service/PostService";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";
import {VoteState} from "../../../Vote/Entity/Vote";
import {AuthService} from "../../../Auth/Service/AuthService";
import {ProfileService} from "../../../Profile/Service/ProfileService";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'post',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class PostComponent implements AfterViewInit, OnDestroy {
    public AttachmentType = AttachmentType;
    public minimized: boolean = false;
    public isIntoView: boolean = false; // в зоне видимости браузера

    private markAsVisitedSubscription: Subscription;
    private isIntoViewSubscription: Subscription;

    @HostBinding('class.visited')
    public visited: boolean = false; // прочитал ли пользователь пост

    @Input('current') current: boolean = true; // Cчитаем что пользователь в feed'e сейчас смотрит этот пост
    @Input() post: Post;

    // @DOTO Доделать развернуть длиннопост!
    // @ViewChild("content") content: ElementRef;
    // @HostBinding('class.long-post')
    // get isLongPost () {
    //     if(this.content) {
    //         return this.content.nativeElement.offsetHeight > 200;
    //     }
    // }    

    constructor(
        private authService: AuthService,
        public render: Renderer2,
        public el: ElementRef,
        public appScrollService: ApplicationScrollService,
        public translationService: TranslationService,
        public profileService: ProfileService,
        public postService: PostService,
        public router: Router
    ) {}

    ngAfterViewInit() {
        this.markAsVisitedSubscription = this.appScrollService
            .onScroll
            .debounceTime(50)
            .filter(scrollTop => scrollTop + 100 > this.el.nativeElement.offsetTop)
            .subscribe(() => this.markAsVisited())
        ;

        this.isIntoViewSubscription = this.appScrollService
            .onScroll
            .debounceTime(50)
            .subscribe((scrollTop) => {
                this.isIntoView =
                    scrollTop < this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight
                    && scrollTop + this.appScrollService.mainHeight > this.el.nativeElement.offsetTop
                ;
            })
        ;
    }

    ngOnDestroy() {
        this.markAsVisitedSubscription.unsubscribe();
        this.isIntoViewSubscription.unsubscribe();
    }

    public toggleView() {
        this.minimized = !this.minimized;
        if (this.el.nativeElement.offsetTop < this.appScrollService.getScroll()) {
            this.el.nativeElement.scrollIntoView();
            this.render.addClass(this.el.nativeElement, "highlight");
            setTimeout(() => this.render.removeClass(this.el.nativeElement, "highlight"), 2000);
        }
    }

    private voteInProgress = false;

    public vote(state: VoteState) {
        if (!this.authService.isSignedIn()) {
            this.router.navigate(["login"]);
        } else if (!this.voteInProgress && this.post.votes.state !== state) {
            this.post.votes.rating += state === "positive" ? 1 : -1;

            if (this.post.votes.state !== "none") {
                this.post.votes[this.post.votes.state] -= 1;
                state = "none";
            }

            this.post.votes[state] += 1;
            this.post.votes.state = state;


            this.postService
                .vote(this.post, state)
                .finally(() => this.voteInProgress = false)
                .subscribe()
            ;
        }
    }

    getPostUrl() {
        return `/post/${getSlug(this.post.title)}-${this.post.id}`;
    }

    @HostListener('click')
    markAsVisited() {
        this.visited = true;
    }

    @HostListener('window:keyup', ['$event'])
    onKeydown(e: KeyboardEvent) {
        if(this.current === false || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
            return;
        }
        
        switch (e.keyCode) {
            case PostHotkeys.VotePositive:
                this.vote("positive");
                break;
            case PostHotkeys.VoteNegative:
                this.vote("negative");
                break;
            case PostHotkeys.OpenPost:
                typeof window != 'undefined' && window.open(this.getPostUrl());
                break;
            case PostHotkeys.StartPost:
                scrollIntoView(this.el.nativeElement, {
                    time: 100,
                    align: {top: 0, topOffset: 20}
                });
                break;
        }
    }
}