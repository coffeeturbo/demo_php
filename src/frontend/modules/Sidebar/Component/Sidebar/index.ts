import {AfterViewInit, Component, ElementRef, Renderer2, ViewChild} from "@angular/core";

import {SidebarService} from "../../Service/SidebarService";
import {AuthService} from "../../../Auth/Service/AuthService";
import {SettingsModalService} from "../../../Settings/Service/SettingsModalService";
import {Config} from "../../../../app/config";
import {ProfileService} from "../../../Profile/Service/ProfileService";
import {Device} from "../../../Application/Service/DeviceService";
import {PlatformService} from "../../../Application/Service/PlatformService";
import {NoticeService} from "../../../Notice/Service/NoticeService";
import {NoticeType} from "../../../Notice/Entity/NoticeType";

@Component({
    selector: "sidebar",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class SidebarComponent implements AfterViewInit {
    @ViewChild('aside') aside: ElementRef;
    @ViewChild('backdrop') backdrop: ElementRef;

    public device = Device;
    public product_name: string = Config.product_name;
    public translateX: number = 0;
    public backdropOpatity: number = 0.7;
    public showNotifications = false;

    constructor(
        public pl: PlatformService,
        public service: SidebarService,
        public auth: AuthService,
        public profile: ProfileService,
        public settingsModalService: SettingsModalService,
        public noticeService: NoticeService,
        private renderer: Renderer2
    ) {}
    
    ngAfterViewInit() {
        if(this.device.isMobile()) {
            this.renderer.listen(this.aside.nativeElement, 'pan', (e) => this.pan(e));
            this.renderer.listen(this.aside.nativeElement, 'panstart', () => this.panStart());
            this.renderer.listen(this.aside.nativeElement, 'panend', (e) => this.panEnd(e));
        }
        
    }
    
    public getUnreadNotifications() {
        return this.noticeService.getNotifications().filter((notice) => !notice.readed).length;
    }
    
    private pan(e) {
        let asideWidth = this.aside.nativeElement.offsetWidth;
        if(e.eventType == 2) {
            this.translateX = Math.min(Math.max(e.deltaX, -asideWidth), 0);
            this.backdropOpatity = 0.7 - this.translateX / asideWidth * -0.7;
        }
    }

    private panStart () {
        this.renderer.addClass(this.aside.nativeElement, "dragging");
        if(this.backdrop)
            this.renderer.addClass(this.backdrop.nativeElement, "dragging");
    }

    private panEnd(e) {
        this.renderer.removeClass(this.aside.nativeElement, "dragging");
        if(this.backdrop)
            this.renderer.removeClass(this.backdrop.nativeElement, "dragging");

        this.translateX = 0;
        this.backdropOpatity = 0.7;

        // Не даём скрыть если скорость движения вправо не выше 0.3
        if(e.velocityX < 0.3) {
            let asideWidth = this.aside.nativeElement.offsetWidth;
            // Скрываем либо если скорость свайпа влево выше 0.3 либо если длина движения больше половины длины aside
            if (e.velocityX < -0.3 || e.deltaX < -asideWidth / 2) {  
                this.service.hide()
            }
        }
    }
    
    public scrollToEnd() {
        setTimeout(() => {
            this.aside.nativeElement.scrollTop = this.aside.nativeElement.scrollHeight
        });
    }
}
