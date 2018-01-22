import {AfterViewInit, Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

import {Config} from "../../../../app/config";

@Component({
    selector: 'share',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ShareComponent implements AfterViewInit {
    @Input() link: string;
    @ViewChild('input') input: ElementRef;
    public applications = Config.applications;
    public uri: string;
    public whatsappLink: SafeResourceUrl;
    public facebookLink: string = 'https://www.facebook.com/dialog/share?app_id='+this.applications.facebook.app_id+'&display=popup&href=' + this.uri;
    public vkLink: string = 'https://vk.com/share.php?url=' + this.uri;
    public telegramLink: string = 'https://t.me/share/url?url=' + this.uri;
    public isCopied = false;
    
    
    constructor(@Inject(DOCUMENT) private dom: Document, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.uri = this.getOrigin() + this.link;
        this.whatsappLink = this.sanitizer.bypassSecurityTrustUrl('whatsapp://send?text=' + this.uri);
    }

    ngAfterViewInit() {
        this.input.nativeElement.select();
    }

    public getOrigin() {
        if(typeof window != 'undefined') {
            return window.location.origin; 
        }    
    }

    public toClipboard() {
        this.input.nativeElement.select();
        this.isCopied = true;

        setTimeout(() => {
            this.isCopied= false;
        }, 1000);
        
        this.dom.execCommand("copy");
    }
}