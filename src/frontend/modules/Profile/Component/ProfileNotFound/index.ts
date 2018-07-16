import {Component} from "@angular/core";

import {PlatformService} from "../../../Application/Service/PlatformService";

@Component({
    selector: "profile-not-found",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class ProfileNotFoundComponent {

    constructor(private pl: PlatformService) {}

    ngOnInit() {
        this.pl.setPageStatus(404);
    }
}