import {Component, ElementRef, HostBinding, Input, Renderer2} from '@angular/core';
import {Post} from "../../Entity/Post";
import {AttachmentType} from "../../../Attachment/Entity/Attachment";
import {ApplicationScrollService} from "../../../Application/Service/ApplicationScrollService";

@Component({
    selector: 'post',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class PostComponent {
    public AttachmentType = AttachmentType;
    public minimized:boolean = false;
    
    @HostBinding('class.visited')
    public visited: boolean = false;

    @Input() post: Post;
    
    constructor(
        public render: Renderer2, 
        public el: ElementRef,
        public applicationScrollService: ApplicationScrollService
    ){
        this.applicationScrollService
            .onScroll
            .debounceTime(50)
            .filter(scrollTop => scrollTop + 100 > this.el.nativeElement.offsetTop)
            .subscribe(() => this.visited = true)
        ;
    }
    
}