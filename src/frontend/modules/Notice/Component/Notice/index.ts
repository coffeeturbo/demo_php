import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {Notice} from "../../Entity/Notice";
import {NoticeType} from "../../Entity/NoticeType";
import {DomSanitizer} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {NoticeService} from "../../Service/NoticeService";

@Component({
    selector: "notice",
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class NoticeComponent implements OnInit {
    @Input() notice: Notice;
    @Output('onActivate') onActivate = new EventEmitter<Notice>();

    @HostBinding('class.active')
    @Input() active = false;

    @HostBinding('class.normal')
    get isNormal() { return this.notice.type == NoticeType.Normal; }

    @HostBinding('class.success')
    get isSuccess() { return this.notice.type == NoticeType.Success; }

    @HostBinding('class.danger')
    get isDanger() { return this.notice.type == NoticeType.Danger; }

    @HostBinding('class.warning')
    get isWarning() { return this.notice.type == NoticeType.Warning; }

    @HostBinding('class.custom')
    get isCustom() { return this.notice.type == NoticeType.Custom; }

    @HostBinding('class.readed')
    get isReaded() { return this.notice.readed; }

    public index: number;
    public showMenu = false;
    public removed = false;
    
    constructor(public sanitizer: DomSanitizer, private router: Router, public noticeService: NoticeService){
    }
    
    ngOnInit() {
        this.index = this.noticeService.notifications.findIndex((notice: Notice) => this.notice.id == notice.id);
    }

    @HostListener('click', ['$event'])
    public click(e) {
        let el = <HTMLElement> e.target;
        if (el.tagName === 'A' && el.hasAttribute('href') && !el.hasAttribute("target")) {
            this.router.navigate([el.getAttribute('href')]);
            e.preventDefault();
        }
    }
    
    public getCustomClass(): string {
        if(this.notice.type == NoticeType.Custom && this.notice.icon) {
            return this.notice.icon;
        }
    }
    
    public hideMenu(): void {
        if(this.showMenu) {
            this.showMenu = false;
        }
    }

    public restoreNotice(): void {
        this.noticeService.restoreNotice(this.notice, this.index);
        this.removed = false;
    }
    
    public removeNotice(): void {
        this.noticeService.removeNotice(this.notice);
        this.removed = true;
    }
}