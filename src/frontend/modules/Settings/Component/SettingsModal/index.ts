import {Component, EventEmitter, Output} from "@angular/core";

import {SettingsModalService} from "../../Service/SettingsModalService";

@Component({
    selector: "settings-modal",
    templateUrl: "./template.pug"
})
export class SettingsModalComponent {
    constructor(public settingsModalService: SettingsModalService) {}

    @Output("on-close") onClose = new EventEmitter<void>();
}
