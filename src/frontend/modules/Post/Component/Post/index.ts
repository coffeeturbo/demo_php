import {Component, ElementRef, HostBinding, HostListener, Input, Renderer2, ViewChild} from '@angular/core';
import {Post} from "../../Entity/Post";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";
import {TranslationService} from "@angular-addons/translate";
import {PostHotkeys} from "./hotkeys";
import {Router} from "@angular/router";

@Component({
    selector: 'post',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class PostComponent {
    public AttachmentType = AttachmentType;
    public minimized:boolean = false;
    public isIntoView: boolean = false;

    // @ViewChild("content") content: ElementRef;
    
    @HostBinding('class.visited')
    public visited: boolean = false;

    // @DOTO Доделать развернуть длиннопост!
    // @HostBinding('class.long-post')
    // get isLongPost () {
    //     if(this.content) {
    //         return this.content.nativeElement.offsetHeight > 200;
    //     }
    // }    

    @Input() post: Post;
    
    constructor(
        public render: Renderer2, 
        public el: ElementRef,
        public appScrollService: ApplicationScrollService,
        public translationService: TranslationService,
        public router: Router
    ){
        this.appScrollService
            .onScroll
            .debounceTime(50)
            .filter(scrollTop => scrollTop + 100 > this.el.nativeElement.offsetTop)
            .subscribe(() => this.markAsVisited())
        ;

        this.appScrollService
            .onScroll
            .debounceTime(50)
            .subscribe((scrollTop) => {
                this.isIntoView =
                    scrollTop < this.el.nativeElement.offsetTop + this.el.nativeElement.offsetHeight
                    &&  scrollTop + this.appScrollService.mainHeight > this.el.nativeElement.offsetTop 
                ;
            })
        ;
    }
    
    public toggleView() {
        this.minimized = !this.minimized;
        if(this.el.nativeElement.offsetTop <  this.appScrollService.getScroll()) {
            this.el.nativeElement.scrollIntoView();
            this.render.addClass(this.el.nativeElement, "highlight");
            setTimeout(() => this.render.removeClass(this.el.nativeElement, "highlight"), 2000);
        }
    }

    @HostListener('click')
    markAsVisited() {
        this.visited = true;    
    }

    @HostListener('window:keydown', ['$event.keyCode'])
    onKeydown(keyCode: number) {
        switch (keyCode) {
            case PostHotkeys.VotePositive:
                this.vote("positive");
                break;
            case PostHotkeys.VoteNegative:
                this.vote("positive");
                break;
            case PostHotkeys.OpenPost:
                typeof window != 'undefined' && window.open(`/post/${this.post.id}`);
                break;
        }
    }

    public vote(state: "positive" | "negative") {
        if (state == "positive") {
            console.log(this.post.id, "Like!")
        } else {
            console.log(this.post.id, "Dislike!")
        }
    }

}