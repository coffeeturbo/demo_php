import {Component} from "@angular/core";

import {PlatformService} from "../../Service/PlatformService";
import {AuthModals} from "../../../Auth/Entity/AuthModals";
import {AuthModalsService} from "../../../Auth/Service/AuthModalsService";
import {ActivatedRoute} from "@angular/router";
import {Role, Roles} from "../../../Auth/Entity/Role";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})

export class ForbiddenRoute {
    public AuthModals = AuthModals;
    public requiredRoles: Roles;
    constructor(public authModalsService: AuthModalsService, private pl: PlatformService, public route: ActivatedRoute) {
        if(route.snapshot.queryParams.hasOwnProperty("requiredRoles")) {
            this.requiredRoles = JSON.parse(route.snapshot.queryParams.requiredRoles);
        }
    }

    ngOnInit() {
        this.pl.setPageStatus(403);
    }
    
    public checkRole(role: Role): boolean {
        return !!~this.requiredRoles.indexOf(role)
    }
}
