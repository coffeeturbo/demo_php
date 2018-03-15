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
    public facebookLink: SafeResourceUrl;
    public vkLink: SafeResourceUrl;
    public telegramLink: SafeResourceUrl;
    public isCopied = false;
    
    constructor(@Inject(DOCUMENT) private dom, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.uri = this.getOrigin() + this.link;
        this.whatsappLink = this.sanitizer.bypassSecurityTrustUrl('whatsapp://send?text=' + this.uri);
        this.facebookLink = this.sanitizer.bypassSecurityTrustUrl('https://www.facebook.com/dialog/share?app_id='+this.applications.facebook.app_id+'&display=popup&href=' + this.uri);
        this.vkLink = this.sanitizer.bypassSecurityTrustUrl('https://vk.com/share.php?url=' + this.uri);
        this.telegramLink = this.sanitizer.bypassSecurityTrustUrl('https://t.me/share/url?url=' + this.uri);
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
            this.isCopied = false;
        }, 1000);
        
        this.dom.execCommand("copy");
    }
}