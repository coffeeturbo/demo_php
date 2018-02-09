import {Component, ViewChild} from "@angular/core";

import {SignUpFormComponent} from "../../Component/SignUpForm";

@Component({
    templateUrl: "./template.pug"
})

export class SignUpRoute {
    @ViewChild(SignUpFormComponent) signUpForm: SignUpFormComponent;
}
