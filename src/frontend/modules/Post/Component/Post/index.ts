import {AfterViewInit, Component, ElementRef, HostBinding, HostListener, Input, OnDestroy, Renderer2} from '@angular/core';
import {Router} from "@angular/router";
import {TranslationService} from "@angular-addons/translate";
import * as getSlug from "speakingurl";

import {Post} from "../../Entity/Post";
import {PostService} from "../../Service/PostService";
import {Attachment, AttachmentType} from "../../../Attachment/Entity/Attachment";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";
import {VoteState} from "../../../Vote/Entity/Vote";
import {AuthService} from "../../../Auth/Service/AuthService";
import {ProfileService} from "../../../Profile/Service/ProfileService";
import {Subscription} from "rxjs";
import {PlatformService} from "../../../Application/Service/PlatformService";
import {AuthModalsService} from "../../../Auth/Service/AuthModalsService";
import {AuthModals} from "../../../Auth/Entity/AuthModals";
import {Meta} from "@angular/platform-browser";
import {AttachmentImage} from "../../../Attachment/Entity/AttachmentImage";
import {RouteHelperService} from "../../../Application/Service/RouteHelperService";

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
    public isShareModalVisible: boolean = false;

    @HostBinding('class.visited')
    public visited: boolean = false; // прочитал ли пользователь пост

    @Input('current') current: boolean = true; // Cчитаем что пользователь в feed'e сейчас смотрит этот пост
    @Input() post: Post;
    @Input() hasSiblings: boolean = false;

    public isExpand: boolean = false;
    public isLongpost: boolean = false;
    // @ViewChild("content") content: ElementRef;
    @HostBinding('class.shorten')
    get isShorten () {
        return !this.isExpand && !this.isPostRoute() && this.isLongpost
    }

    constructor(
        private authService: AuthService,
        private authModalsService: AuthModalsService,
        public render: Renderer2,
        public el: ElementRef,
        public appScrollService: ApplicationScrollService,
        public pl: PlatformService,
        public translationService: TranslationService,
        public profileService: ProfileService,
        public postService: PostService,
        public router: Router,
        public routeHelperService: RouteHelperService,
        public metaService: Meta,
    ) {
        this.metaService.addTag({"name": "og:type", "content": 'article'});
    }

    ngAfterViewInit() {
        setTimeout(
            () => this.isLongpost = this.el.nativeElement.querySelector(".content").offsetHeight > 400
        );
        
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
        
        this.post.attachments
            .filter(attachment => attachment.type == AttachmentType.image)
            .forEach((attachment: Attachment<AttachmentImage>) => {
                this.metaService.addTag({"name": "og:image", "content": this.routeHelperService.host + '/' + attachment.content.public_path});
            })
        ;
    }

    ngOnDestroy() {
        if(this.markAsVisitedSubscription) this.markAsVisitedSubscription.unsubscribe();
        if(this.isIntoViewSubscription) this.isIntoViewSubscription.unsubscribe();
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
            this.authModalsService.show(AuthModals.signIn);
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

    public getPostUrl(params: {short: boolean} = {short: false}) {
        return `/post/${(params.short ? "" : getSlug(this.post.title + "-")) + "-" + this.post.id}`;
    }

    @HostListener('click')
    markAsVisited() {
        this.visited = true;
    }

    // @TODO: Лютый тупняк в лентах (отрабатывает сразу на каждый пост в ленте!
    // @HostListener('window:keyup', ['$event'])
    // onKeydown(e) {
    //     if(this.current === false || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
    //         return;
    //     }
    //    
    //     switch (e.keyCode) {
    //         case PostHotkeys.VotePositive:
    //             this.vote("positive");
    //             break;
    //         case PostHotkeys.VoteNegative:
    //             this.vote("negative");
    //             break;
    //         case PostHotkeys.OpenPost:
    //             typeof window != 'undefined' && window.open(this.getPostUrl());
    //             break;
    //         case PostHotkeys.StartPost:
    //             scrollIntoView(this.el.nativeElement, {
    //                 time: 100,
    //                 align: {top: 0, topOffset: 20}
    //             });
    //             break;
    //     }
    // }

    public isPostRoute(): boolean {
        return this.router.isActive("/post", false)
    }

    public favorite() {
        this.postService
            .favorite(this.post)
            .subscribe(post => this.post = post)
        ;
    }
    
    public edit() {
        this.router.navigate([this.postService.getUrl(this.post.id, this.post.title), 'edit'])
    }
}