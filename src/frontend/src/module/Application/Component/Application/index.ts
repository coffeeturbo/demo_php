import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

import '../../../../styles/index.scss';

@Component({
    selector: 'application',
    templateUrl: './template.pug',
})
export class ApplicationComponent {

    constructor(
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute
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
                titleService.setTitle(event['title'])
            });
    }
}
