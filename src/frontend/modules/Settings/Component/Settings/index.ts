import {Component} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";

import {LocaleService} from "../../../Common/Translate/Service/LocaleService";

@Component({
    selector: "settings",
    templateUrl: "./template.pug",
    styleUrls: ["./style.shadow.scss"]
})
export class SettingsComponent {
    protected disabled: boolean = false;
    public fail: boolean = false;
    

    public form: FormGroup = new FormGroup({
        locale: new FormControl(this.localeService.getLocale()),
        show_porno: new FormControl(false)
    });

    constructor(public localeService: LocaleService) {}

    public submit(): void {
        let formData = this.form.value;
        this.localeService.setLocale(formData["locale"]);
    }
}