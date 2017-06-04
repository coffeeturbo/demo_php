import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {NavigationStart, Router} from "@angular/router";
import {Device} from "../../Application/Service/DeviceService";

@Injectable()
export class SidebarService {

    private visibility: SidebarState;

    constructor(private router: Router) {
        let defaultState: SidebarState = Device.isMobile() ? "hidden" : "visible";
        this.visibility = defaultState;
        router.events
            .filter(event => event instanceof NavigationStart && Device.isMobile())
            .subscribe(() => this.visibility = defaultState)
        ;
    }

    public toggle(): void {
        this.visibility = this.visibility == "visible" ? "hidden" : "visible"
    }

    public hide(): void {
        this.visibility = "hidden";
    }

    public get state(): SidebarState {
        return this.visibility;
    }
}

type SidebarState = "visible" | "hidden";