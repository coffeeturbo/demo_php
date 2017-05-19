import {Component, ViewChild} from '@angular/core';
import {SignUpFormComponent} from "../../Component/SignUpForm/index";

@Component({
    templateUrl: './template.pug'
})

export class SignUpRoute {
    @ViewChild(SignUpFormComponent) signUpForm: SignUpFormComponent;
}
