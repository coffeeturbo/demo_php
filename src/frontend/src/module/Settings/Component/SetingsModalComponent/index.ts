import {Component} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {LocaleService} from "../../../Translate/Service/LocaleService";
import {SettingsModalComponentService} from "../../Service/SettingsModalComponentService";

@Component({
    selector: 'settings-modal',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class SettingsModalComponent {
    constructor(public settingsModalComponentService: SettingsModalComponentService) {}
}
