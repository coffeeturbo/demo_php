import {Component} from "@angular/core";

import {PlatformService} from "../../Service/PlatformService";

@Component({
    templateUrl: "./template.pug"
})
export class PageNotFoundRoute {

    constructor(private pl: PlatformService) {}

    ngOnInit() {
        this.pl.setPageStatus(404);
    }    
}
