import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import {RecoverPasswordByEmailFormComponent, RecoverPasswordByEmailStep} from "../../Component/RecoverPasswordByEmailForm";
import {AuthService} from "../../Service/AuthService";

@Component({
    templateUrl: './template.pug',
})
export class RecoverPasswordByEmailRoute implements OnInit, OnDestroy {
    public RecoverPasswordByEmailStep = RecoverPasswordByEmailStep;
    @ViewChild(RecoverPasswordByEmailFormComponent) recoverPasswordByEmailFormComponent: RecoverPasswordByEmailFormComponent;
    private onAuthSuccessSubscription: Subscription;

    constructor(public route: ActivatedRoute, public router: Router, private authService: AuthService){}

    ngOnInit() {
        this.onAuthSuccessSubscription = this.authService.onAuthSuccess.subscribe((()=> this.router.navigate([".."])))
    }
    
    ngOnDestroy() {
        this.onAuthSuccessSubscription.unsubscribe();
    }
}