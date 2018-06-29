import {EventEmitter, Injectable, Injector} from "@angular/core";

import {AuthService} from "../../Auth/Service/AuthService";
import {TokenService} from "../../Auth/Service/TokenService";
import {PlatformService} from "./PlatformService";

@Injectable()
export class StartupService {

    private promises: Promise<any>[] = [];

    constructor(private injector: Injector) {}

    init(): Promise<any> {
        let pl: PlatformService = this.injector.get(PlatformService);
        let authService: AuthService = this.injector.get(AuthService);
        let tokenService: TokenService = this.injector.get(TokenService);

        if (tokenService.isTokenExist() && tokenService.getTokenExpTime() < 0) { // If token expired wait before get a new

            if(pl.isPlatformBrowser()) {
                let status: HTMLElement = document.getElementById("statusText");
                
                if(status) {
                    status.innerText = "Авторизация...";
                }
            }

            let onAuthComplete = new EventEmitter<void>(); // Отдельный event, т.к. вызываем complete, завершающий его. а нам не нужно что бы основной event завершался
            authService.onAuthComplete.subscribe(() => onAuthComplete.complete());

            this.promises.push(onAuthComplete.toPromise());
        }

        authService.addTokenExpirationSchedule();

        return Promise.all(this.promises);
    }
}