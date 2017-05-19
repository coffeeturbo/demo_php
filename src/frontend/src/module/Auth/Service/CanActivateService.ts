import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {CanActivate} from '@angular/router';
import {AuthService} from "./AuthService";
import {Roles} from "../Entity/Role";

@Injectable()
export class CanActivateService implements CanActivate {

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        this.route.data['returnUrl'] = state.url;

        if (!this.authService.isSignedIn()) {
            this.router.navigate(['login']);
            return false;
        }

        if (route.data.hasOwnProperty('allow') && !this.canActivateByRole(route.data.allow)) {
            this.router.navigate(['forbidden']);
            return false;
        } else {
            return true;
        }
    }

    canActivateByRole(roles: Roles): boolean {
        return this.authService.getRoles().filter(n => roles.indexOf(n) !== -1).length > 0
    }
}