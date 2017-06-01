import {Injectable} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {Device} from "../../Application/Service/DeviceService";

@Injectable()
export class SidebarService {

    private visibility: SidebarState = "visible";

    constructor(private router: Router) {
        let defaultState: SidebarState = Device.isMobile() ? "hidden" : "visible";
        this.visibility = defaultState;
        router.events.subscribe(() => {
            if (Device.isMobile()) {
                this.visibility = defaultState;
            }
        })
    }

    public toggle() {
        return this.visibility = this.visibility == "visible" ? "hidden" : "visible"
    }

    public hide() {
        return this.visibility = "hidden";
    }

    public get state(): "visible" | "hidden" {
        return this.visibility;
    }

}

type SidebarState = "visible" | "hidden";