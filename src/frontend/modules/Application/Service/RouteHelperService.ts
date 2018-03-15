import {Location} from "@angular/common";
import {Injectable, Injector} from "@angular/core";
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
import {Observable, Subscription} from "rxjs";
import {LoadingBarService, LoadingBarState} from "@angular-addons/loading-bar";
import {TranslationService} from "@angular-addons/translate";
import {Metrika} from "ng-yandex-metrika";
import {PlatformService} from "./PlatformService";

@Injectable()
export class RouteHelperService {

    private showProgressBarSubscription: Subscription = new Subscription();
    private previousUrl: string;
    private currentUrl: string = this.location.path();

    constructor(
        private titleService: Title,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private translationService: TranslationService,
        private loadingBar: LoadingBarService,
        private location: Location,
        private injector: Injector,
        private pl: PlatformService
    ) {}

    public loadingIndicatorWatcher(): void {
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
                    if (this.loadingBar.getLoadingBar.state == LoadingBarState.Active) {
                        this.loadingBar.completeProgress();
                    }
                    break;
            }
        });
    }

    public titleWatcher(): void {
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
    
    public yandexMetrikaWatcher(): void {
        if(this.pl.isPlatformBrowser()) {
            let metrika = this.injector.get(Metrika);
            this.router.events
                .filter(event => event instanceof NavigationEnd)
                .subscribe(() => {
                    metrika.hit(this.currentUrl, {
                        referer: this.previousUrl,
                    });
                })
            ;
        }
    }
    
    public historyWatcher(): void {
        this.router.events
            .filter(event => event instanceof NavigationStart)
            .subscribe((event: NavigationStart) => {
                if(this.currentUrl != event.url) {
                    this.previousUrl = this.currentUrl;
                    this.currentUrl = event.url;
                }
            })
        ;
    }
    
    public getPrevUrl(): string {
        return this.previousUrl;
    }
}