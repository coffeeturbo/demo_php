import {Component} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";

import {LocaleService} from "../../../Common/Translation/Service/LocaleService";
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
        locale: new FormControl(this.localeService.getLocale()),
        show_porno: new FormControl(false),
        show_pad: new FormControl(false)
    });

    constructor(public localeService: LocaleService) {}

    public submit(): void {
        let formData = this.form.value;
        this.localeService.setLocale(formData["locale"]);
    }
}