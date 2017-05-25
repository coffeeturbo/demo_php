import {Injectable, Injector} from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import {AuthService} from "../../Auth/Service/AuthService";
import {TokenStorageService} from "../../Auth/Service/TokenStorageService";

@Injectable()
export class StartupService {

    private promises: Promise<any>[] = [];

    constructor(private tokenStorage: TokenStorageService, private injector: Injector) {}

    init(): Promise<any> {
        let authService: AuthService = this.injector.get(AuthService);

        if (this.tokenStorage.getTokenExpTime() < 0) // If token expired wait before get a new
            this.promises.push(authService.onRefreshToken.toPromise());

        authService.addTokenExpirationSchedule();

        return Promise.all(this.promises);
    }
}