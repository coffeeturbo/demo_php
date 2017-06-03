import {Component, HostBinding} from '@angular/core';

import {SidebarService} from "../../../Sidebar/Service/SidebarService";
import {AuthService} from "../../../Auth/Service/AuthService";
import {RouteHelperService} from "../../Service/RouteHelperService";
import {Device} from "../../Service/DeviceService";
import {LoadingBarEvents} from "../../../UI/LoadingBar/Event/LoadingBarEvents";
import {LoaderBar, LoaderBarState} from "../../../UI/LoadingBar/Entity/LoaderBar";

@Component({
    selector: 'application',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class ApplicationComponent {
    @HostBinding('class') className: string;
    public device = Device;

    constructor(
        public sidebar: SidebarService,
        public auth: AuthService,
        private routeHelper: RouteHelperService,
        private loadingBarEvents: LoadingBarEvents,
    ) {
        loadingBarEvents.onChangeState
            .map((loaderBar: LoaderBar) => loaderBar.state)
            .map((state: LoaderBarState) => state ? 'progress' : '')
            .subscribe((className: string) => this.className = className);

        this.routeHelper.titleWatcher();
        this.routeHelper.loadingIndicatorWatcher();
    }
}
