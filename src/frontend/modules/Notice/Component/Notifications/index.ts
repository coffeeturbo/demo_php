import {Component} from '@angular/core';
import {NoticeService} from "../../Service/NoticeService";
import {Notice} from "../../Entity/Notice";
import {FormControl, FormGroup} from "@angular/forms";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: "notifications",
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class NotificationsComponent {

    public activeNotice: Notice;

    public form: FormGroup = new FormGroup({
        message: new FormControl(null),
        type: new FormControl(0)
    });
    
    public unreadNotifications = this.getNotifications(false);
    public readNotifications = this.getNotifications(true);

    constructor(public noticeService: NoticeService, public sanitizer: DomSanitizer){
    }

    public toggleActiveNotice(notice: Notice, markAsRead: boolean = true) {
        if(markAsRead) this.noticeService.markAsRead(notice);
        if(this.activeNotice !== notice) {
            this.activeNotice = notice;
        } else {
            delete this.activeNotice;
        }
    }

    public removeActiveNotice() {
        delete this.activeNotice;
    }

    
    getNotifications(readed?:boolean) {
        let notifications = this.noticeService.getNotifications().reverse();
        
        if(typeof readed === 'boolean') {
            notifications = notifications.filter(notice => !!notice.readed === readed)
        }
        
        return notifications;
    }
}