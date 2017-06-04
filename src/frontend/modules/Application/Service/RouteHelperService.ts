import {Injectable} from "@angular/core";
import {Title} from "@angular/platform-browser";
import {
    ActivatedRoute,
    Event,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
    Router
} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

import {TranslationService} from "../../Common/Translate/Service/TranslationService";
import {LoadingBarService} from "../../Common/LoadingBar/Service/LoadingBarService";

@Injectable()
export class RouteHelperService {

    private showProgressBarSubscription: Subscription = new Subscription();

    constructor(
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private translationService: TranslationService,
        private loadingBar: LoadingBarService
    ) {}

    loadingIndicatorWatcher(): void {
        this.router.events.subscribe((event: Event) => {

            switch (event.constructor) {
                case NavigationStart:
                    this.showProgressBarSubscription = Observable.of([]).delay(100).subscribe(() => {
                        this.loadingBar.setProgress(30);
                        this.loadingBar.startProgress();
                    });
                    break;
                case NavigationEnd:
                case NavigationCancel:
                case NavigationError:
                    this.showProgressBarSubscription.unsubscribe();
                    if (this.loadingBar.getLoaderBar.progress > 0) {
                        this.loadingBar.completeProgress();
                    }
                    break;
            }
        });
    }

    titleWatcher(): void {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === "primary")
            .mergeMap(route => route.data)
            .filter(event => event["title"] !== undefined)
            .map(event => event["title"])
            .map(title => this.translationService.translate(title))
            .subscribe((title) => this.titleService.setTitle(title))
        ;
    }
}