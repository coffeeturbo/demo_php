import {Component} from "@angular/core";

import {SidebarService} from "../../Service/SidebarService";
import {AuthService} from "../../../Auth/Service/AuthService";
import {SettingsModalService} from "../../../Settings/Service/SettingsModalService";
import {Config} from "../../../../app/config";

@Component({
    selector: "sidebar",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class SidebarComponent {
    public product_name: string = Config.product_name;

    constructor(
        public service: SidebarService,
        public auth: AuthService,
        public settingsModalService: SettingsModalService
    ) {}
}
