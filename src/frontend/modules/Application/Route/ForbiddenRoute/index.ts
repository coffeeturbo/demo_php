import {Component} from "@angular/core";

import {PlatformService} from "../../Service/PlatformService";
import {AuthModals} from "../../../Auth/Entity/AuthModals";

@Component({
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})

export class ForbiddenRoute {
    public AuthModals = AuthModals;
    constructor(private pl: PlatformService) {}

    ngOnInit() {
        this.pl.setPageStatus(403);
    }
}
