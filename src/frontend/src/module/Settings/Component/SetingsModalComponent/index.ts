import {Component} from "@angular/core";
import {SettingsModalService} from "../../Service/SettingsModalService";

@Component({
    selector: 'settings-modal',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class SettingsModalComponent {
    constructor(public settingsModalService: SettingsModalService) {}
}
