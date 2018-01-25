import {Component} from "@angular/core";

import {Config} from "../../../../app/config";
import {PlatformService} from "../../Service/PlatformService";

@Component({
    selector: "application-logo",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})

export class ApplicationLogoComponent {
    public product_name: string = Config.product_name;
    
    constructor(public pl : PlatformService){}
}
