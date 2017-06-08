import {Component} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {TranslationService} from "@angular-addons/translate";

import {Device} from "../../../Application/Service/DeviceService";

@Component({
    selector: "settings",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class SettingsComponent {
    protected disabled: boolean = false;
    public fail: boolean = false;
    public device = Device;
    

    public form: FormGroup = new FormGroup({
        locale: new FormControl(this.translationService.getLocale()),
        show_porno: new FormControl(false),
        show_pad: new FormControl(false)
    });

    constructor(public translationService: TranslationService) {}

    public submit(): void {
        let formData = this.form.value;
        this.translationService.setLocale(formData["locale"]);
    }
}