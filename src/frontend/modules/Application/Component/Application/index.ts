import {Component, HostBinding} from '@angular/core';

import {SidebarService} from "../../../Sidebar/Service/SidebarService";
import {AuthService} from "../../../Auth/Service/AuthService";
import {RouteHelperService} from "../../Service/RouteHelperService";
import {Device} from "../../Service/DeviceService";

@Component({
    selector: 'application',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class ApplicationComponent {
    @HostBinding('class') className: string;
    
    config = require('../../../../app/config.json');

    constructor(
        public sidebarService: SidebarService,
        public authService: AuthService,
        public routeHelperService: RouteHelperService
    ) {
        routeHelperService.onLoading
            .map(loading => loading ? 'progress' : '')
            .subscribe(className => this.className = className);
        
        this.routeHelperService.titleWatcher();
        this.routeHelperService.loadingIndicatorWatcher();
    }
}
