import {Component} from "@angular/core";

import {PlatformService} from "../../../Application/Service/PlatformService";

@Component({
    selector: "post-not-found",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class PostNotFoundComponent {

    constructor(private pl: PlatformService) {}

    ngOnInit() {
        this.pl.setPageStatus(404);
    }
}