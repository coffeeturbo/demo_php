import {Component} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {LocaleService} from "../../../Translate/Service/LocaleService";

@Component({
    selector: 'settings',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class SettingsComponent {
    protected disabled: boolean = false;
    public fail: boolean = false;
    
    
    public form: FormGroup = new FormGroup({
        locale: new FormControl(this.localeService.getLocale())
    });

    constructor(public localeService: LocaleService){}
    
    public submit() {
        let formData = this.form.value;
        this.localeService.setLocale(formData['locale']);
    }
    
}
