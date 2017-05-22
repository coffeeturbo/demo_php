import {Component, ViewChild} from '@angular/core';
import {SignInFormComponent} from "../../Component/SignInForm/index";

@Component({
    templateUrl: './template.pug',
})

export class SignInRoute {
    @ViewChild(SignInFormComponent) signInForm: SignInFormComponent;
}
