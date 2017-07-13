import {AfterViewInit, Directive, Input} from "@angular/core";
import {FormGroup} from "@angular/forms";

@Directive({
    selector: '[chrome-autofill-fix]'
})

/**
 * Если значения формы меняются в первые 250ms и поле username не пустое задаем полю password временное значение
 * Примечание: временный сбросится как только пользователь проявит активность (клик, нажатие клавиши и т.п.).
 */
export class ChromeAutoFillFix implements AfterViewInit {
    @Input() formGroup: FormGroup;

    ngAfterViewInit() {
        this.formGroup.valueChanges
            .timeout(250)
            .first()
            .filter(data => data["username"])
            .subscribe(
                () => this.formGroup.controls["password"].setValue("temp_val"),
                ()=>{}
            )
        ;
    }
}