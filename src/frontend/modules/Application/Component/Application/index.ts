import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

import '../../../../assets/styles/index.scss';
import {SidebarService} from "../../../Sidebar/Service/SidebarService";
import {AuthService} from "../../../Auth/Service/AuthService";
import {Device} from "../../Service/DeviceService";
import {TranslationService} from "../../../Translate/Service/TranslationService";

@Component({
    selector: 'application',
    templateUrl: './template.pug',
    styleUrls: ['./style.shadow.scss']
})
export class ApplicationComponent {
    config = require('../../../../app/config.json');

    constructor(
        public  sidebarService: SidebarService,
        public  authService: AuthService,
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private translationService: TranslationService
    ) {
        
        // Set title from route data
        router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                let title = this.translationService.translate(event['title']);
                titleService.setTitle(title)
            });
    }
}
