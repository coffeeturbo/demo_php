import {Component, ViewChild} from "@angular/core";

import {SignInFormComponent} from "../../Component/SignInForm";
import {ActivatedRoute, Router} from "@angular/router";
import {RouteHelperService} from "../../../Application/Service/RouteHelperService";

@Component({
    templateUrl: "./template.pug",
})

export class SignInRoute {
    @ViewChild(SignInFormComponent) signInForm: SignInFormComponent;
    public closeMode = this.routeHelperService.getPrevUrl() ? 2 : 0;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private routeHelperService: RouteHelperService
    ){}

    close() {
        if(this.routeHelperService.getPrevUrl()) {
            this.router.navigate([this.routeHelperService.getPrevUrl()]);
        }
    }
}