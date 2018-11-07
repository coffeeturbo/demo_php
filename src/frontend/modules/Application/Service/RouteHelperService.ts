import {DOCUMENT, Location} from "@angular/common";
import {Inject, Injectable, Injector} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";
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
import {PopStateEvent} from "@angular/common/src/location/location";

@Injectable()
export class RouteHelperService {

    private showProgressBarSubscription: Subscription = new Subscription();
    private previousUrl: string;
    private currentUrl: string = this.location.path();
    public popState: PopStateEvent;
    public host: string;

    constructor(
        private titleService: Title,
        private metaService: Meta,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private translationService: TranslationService,
        private loadingBar: LoadingBarService,
        private location: Location,
        private injector: Injector,
        private pl: PlatformService,
        @Inject(DOCUMENT) private document
    ) {
        if(process.env.hasOwnProperty('dotenv') && process.env.dotenv.hasOwnProperty('HOST')) {
            this.host = process.env.dotenv.HOST;
        } else if(typeof window != 'undefined') {
            this.host = window.location.origin;
        }
        
        Observable
            .create((observer) => this.location.subscribe((data) => observer.next(data)))
            .map((popState: PopStateEvent) => {
                popState.url = popState.url || "/";
                return popState;
            })
            .subscribe((popState: PopStateEvent) => this.popState = popState)
        ;

        this.router.events
            .filter(event => event instanceof NavigationStart)
            .filter((event: NavigationStart) => this.popState && this.popState.url != event.url)
            .subscribe((event: NavigationStart) => this.popState = {url : event.url, pop : false, type : "pushstate"})
        ;
    }

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
            .subscribe((title) => {
                if(this.pl.isPlatformServer()) {
                    this.document.title = title;
                }
                
                this.titleService.setTitle(title);
                this.metaService.addTag({"name": "og:title", "content": title});
            })
        ;
    }
    
    public descriptionWatcher(): void {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === "primary")
            .mergeMap(route => route.data)
            .filter(event => event["description"] !== undefined)
            .map(event => event["description"])
            .map(description => this.translationService.translate(description))
            .subscribe((description) => this.metaService.addTag({"name": "description", "content": description}))
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