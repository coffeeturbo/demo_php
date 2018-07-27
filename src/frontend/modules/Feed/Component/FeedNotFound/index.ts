import {Component} from "@angular/core";

import {PlatformService} from "../../../Application/Service/PlatformService";
import {HttpCodes} from "../../../Application/Entity/HttpCodes";

@Component({
    selector: "feed-not-found",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class FeedNotFoundComponent {

    constructor(private pl: PlatformService) {}

    ngOnInit() {
        this.pl.setPageStatus(HttpCodes.NotFound);
    }
}