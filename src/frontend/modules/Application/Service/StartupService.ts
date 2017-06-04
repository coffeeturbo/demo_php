import {Injectable, Injector} from "@angular/core";

import {AuthService} from "../../Auth/Service/AuthService";
import {TokenRepository} from "../../Auth/Repository/TokenRepository";

@Injectable()
export class StartupService {

    private promises: Promise<any>[] = [];

    constructor(private injector: Injector) {}

    init(): Promise<any> {
        let authService: AuthService = this.injector.get(AuthService);

        if (TokenRepository.isTokenExist() && TokenRepository.getTokenExpTime() < 0) // If token expired wait before get a new
            this.promises.push(authService.onRefreshToken.toPromise());

        authService.addTokenExpirationSchedule();

        return Promise.all(this.promises);
    }
}