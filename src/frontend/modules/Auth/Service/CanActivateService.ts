import {Injectable} from "@angular/core";
import {ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";

import {AuthService} from "./AuthService";
import {Roles} from "../Entity/Role";
import {AuthModalsService} from "./AuthModalsService";
import {AuthModals} from "../Entity/AuthModals";

@Injectable()
export class CanActivateService implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private authModalsService: AuthModalsService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.route.data["returnUrl"] = state.url;

        if (!this.authService.isSignedIn()) {
            this.router.navigate(["/"]);
            this.authModalsService.show(AuthModals.signIn);
            return false;
        }

        if (route.data.hasOwnProperty("allow") && !this.canActivateByRole(route.data.allow, route.data.verificationType === "full" || false)) {
            this.router.navigate(["forbidden"], { queryParams:  {requiredRoles: JSON.stringify(this.getDiffRoles(route.data.allow))} });
            return false;
        } else {
            return true;
        }
    }

    canActivateByRole(roles: Roles, full: boolean = false): boolean {
        return this.authService.getRoles().filter(n => !!~roles.indexOf(n)).length >= (full ? roles.length : 1);
    }
    
    getDiffRoles(roles: Roles) {
        return roles.filter(n => !~this.authService.getRoles().indexOf(n));
    }
}