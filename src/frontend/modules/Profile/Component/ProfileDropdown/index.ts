import {Component, ElementRef, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Profile} from "../../Entity/Profile";
import {ProfileService} from "../../Service/ProfileService";
import {AuthService} from "../../../Auth/Service/AuthService";
import {NavigationEnd, Router} from "@angular/router";

@Component({
    selector: 'profile-tooltip',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})

export class ProfileDropdownComponent implements OnInit {
    @Output() onClose = new EventEmitter<void>();
    public profile: Profile;

    constructor(
        public elRef: ElementRef,
        public auth: AuthService,
        public router: Router,
        public profileService: ProfileService
    ) {}

    ngOnInit() {
        this.profileService.getOwnProfile()
            .subscribe((profile: Profile) => this.profile = profile);
        
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .subscribe(() => this.onClose.emit())
    }

    @HostListener('document:click', ['$event.target'])
    public onBlur(target?: HTMLElement | any) {
        if (!this.elRef.nativeElement.parentElement.contains(target)) {
            this.onClose.emit()
        }
    }
}