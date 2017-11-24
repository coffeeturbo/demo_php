import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {AttachmentVideo} from "../../Entity/AttachmentVideo";
import * as moment from "moment";

@Component({
    selector: 'attachment-video-youtube',
    templateUrl: './template.pug',
    styleUrls: ["./style.shadow.scss"]
})
export class AttachmentVideoYoutubeComponent implements OnInit {
    @Input() attachment: AttachmentVideo;
    public videoUrl: SafeResourceUrl;
    public isVideoContainerHidden: boolean = true;
    public duration: string;

    constructor(private sanitizer: DomSanitizer) {}
    
    ngOnInit() {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            "https://www.youtube.com/embed/" + this.attachment.youtubeId + "?rel=0&showinfo=0&fs=1&wmode=opaque&autoplay=1&enablejsapi=1&widgetid=3"
        );
        
        // @TODO: сделать нормальное отображение продолжительности!
        this.duration = moment.duration(this.attachment.duration, 'seconds').humanize();
    }
}