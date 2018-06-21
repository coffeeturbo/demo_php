import {Component, ViewChild} from '@angular/core';
import {RecoverPasswordByEmailFormComponent, RecoverPasswordByEmailStep} from "../../Component/RecoverPasswordByEmailForm";
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: './template.pug',
})

export class RecoverPasswordByEmailRoute {
    public RecoverPasswordByEmailStep = RecoverPasswordByEmailStep;
    @ViewChild(RecoverPasswordByEmailFormComponent) recoverPasswordByEmailFormComponent: RecoverPasswordByEmailFormComponent;

    constructor(public route: ActivatedRoute){}
}