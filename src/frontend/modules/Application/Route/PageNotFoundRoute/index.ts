import {Component} from "@angular/core";

import {PlatformService} from "../../Service/PlatformService";
import {HttpCodes} from "../../Entity/HttpCodes";

@Component({
    templateUrl: "./template.pug"
})
export class PageNotFoundRoute {

    constructor(private pl: PlatformService) {}

    ngOnInit() {
        this.pl.setPageStatus(HttpCodes.NotFound);
    }    
}
