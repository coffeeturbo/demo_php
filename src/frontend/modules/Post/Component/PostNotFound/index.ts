import {Component} from "@angular/core";

import {PlatformService} from "../../../Application/Service/PlatformService";
import {HttpCodes} from "../../../Application/Entity/HttpCodes";

@Component({
    selector: "post-not-found",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class PostNotFoundComponent {

    constructor(private pl: PlatformService) {}

    ngOnInit() {
        this.pl.setPageStatus(HttpCodes.NotFound);
    }
}