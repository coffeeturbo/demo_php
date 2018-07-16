import {Component} from "@angular/core";

import {PlatformService} from "../../Service/PlatformService";
import {AuthModals} from "../../../Auth/Entity/AuthModals";
import {AuthModalsService} from "../../../Auth/Service/AuthModalsService";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})

export class ForbiddenRoute {
    public AuthModals = AuthModals;
    constructor(public authModalsService: AuthModalsService, private pl: PlatformService) {}

    ngOnInit() {
        this.pl.setPageStatus(403);
    }
}
