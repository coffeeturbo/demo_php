import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
    selector: 'attachment-video-youtube',
    templateUrl: './template.pug',
    styleUrls: ["./style.shadow.scss"]
})
export class AttachmentVideoYoutubeComponent {
    @Input() youtubeId: string;
    videoUrl: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {}
    
    ngOnInit() {
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            "https://www.youtube.com/embed/" + this.youtubeId + "?rel=0&showinfo=0&fs=1&wmode=opaque&autoplay=0&enablejsapi=1&widgetid=3"
        );
    }
}