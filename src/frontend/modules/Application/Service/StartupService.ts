import {EventEmitter, Injectable, Injector} from "@angular/core";

import {AuthService} from "../../Auth/Service/AuthService";
import {TokenRepository} from "../../Auth/Repository/TokenRepository";

@Injectable()
export class StartupService {

    private promises: Promise<any>[] = [];

    constructor(private injector: Injector) {}

    init(): Promise<any> {
        let status: HTMLElement = document.getElementById("statusText");
        let authService: AuthService = this.injector.get(AuthService);

        if (TokenRepository.isTokenExist() && TokenRepository.getTokenExpTime() < 0) { // If token expired wait before get a new
            status.innerText = "Авторизация...";
            let onAuth = new EventEmitter<void>(); // Отдельный event, т.к. вызываем complete, завершающий его. а нам не нужно что бы основной event завершался
            authService.onAuth.subscribe(() => onAuth.complete());
            
            this.promises.push(onAuth.toPromise());
        }

        authService.addTokenExpirationSchedule();

        return Promise.all(this.promises);
    }
}