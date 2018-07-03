import {Injectable} from "@angular/core";
import * as striptags from "striptags";

import {PlatformService} from "../../Application/Service/PlatformService";
import {Notice} from "../Entity/Notice";
import {Notifications} from "../Entity/Notifications";
import {NoticeType} from "../Entity/NoticeType";
import {FaviconService} from "../../Application/Service/FaviconService";

@Injectable()
export class NoticeService {
    
    private noticeKey = "notice";
    public notifications: Notifications = this.readNotifications();
    public allowedTags = ['a', 'b', 'em', 'strong', 'i', 'u', 'p', 'strike', 'blockquote'];
    
    constructor(private pl: PlatformService, private faviconService: FaviconService) {
    }
    
    public addNotice(message: string, type: NoticeType, icon?: string): Notice 
    {
        let id = this.notifications.length > 0 ? this.notifications[this.notifications.length-1].id + 1 : 0;
        let notice: Notice = {id, message, type, created: new Date()};
        
        if(icon) notice.icon = icon; 

        notice.message = striptags(notice.message, this.allowedTags);
        
        this.notifications.push(notice);
        this.faviconService.setUnreadFavicon();
        this.saveNotifications();

        return notice;
    }
    
    public restoreNotice(notice: Notice, index: number) {
        this.notifications.splice(index,0, notice);
        this.saveNotifications();
    }

    public removeNotice(notice: Notice): void 
    {
        this.notifications.splice(this.notifications.indexOf(notice), 1);
        this.saveNotifications();
    }

    public markAsRead(notice: Notice) {
        let index: number = this.notifications.indexOf(notice);
        this.notifications[index].readed = true;
        this.saveNotifications();
    }

    public getNotifications(): Notifications 
    {
        return this.notifications;
    }

    public readNotifications(): Notifications 
    {
        return this.pl.isPlatformBrowser() ? <Notifications>JSON.parse(localStorage.getItem(this.noticeKey) || "[]") : [];
    }
    
    private saveNotifications(): void
    {
        if(this.pl.isPlatformBrowser()) {
            localStorage.setItem(this.noticeKey, JSON.stringify(this.notifications));
        }
    }
}