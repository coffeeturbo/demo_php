import {APP_INITIALIZER, Injectable, LOCALE_ID, NgModule} from "@angular/core";
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {Http, HttpModule, RequestOptions} from "@angular/http";
import {registerLocaleData} from "@angular/common";
import localeRu from '@angular/common/locales/ru';

import {RESTModule} from "@angular-addons/rest";
import {Locale, TranslationService} from "@angular-addons/translate";
import {AuthConfig, AuthHttp} from "angular2-jwt";

import {appRoutes} from "../../app/routes";
import "../../assets/styles/index.scss";

import {ApplicationComponent} from "./Component/Application/index";
import {ApplicationMainFrameComponent} from "./Component/ApplicationMain/index";
import {ApplicationScrollButtonComponent} from "./Component/ApplicationScrollButton/index";
import {ForbiddenRoute} from "./Route/ForbiddenRoute/index";
import {PageNotFoundRoute} from "./Route/PageNotFoundRoute/index";
import {StartupService} from "./Service/StartupService";
import {AuthModule} from "../Auth/AuthModule";
import {CommonModule} from "../Common/CommonModule";
import {SidebarModule} from "../Sidebar/SidebarModule";
import {SettingsModule} from "../Settings/SettingsModule";
import {FeedModule} from "../Feed/FeedModule";
import {ProfileModule} from "../Profile/ProfileModule";
import {ApplicationScrollService} from "./Service/ApplicationScrollService";
import {RouteHelperService} from "./Service/RouteHelperService";
import {ApplicationLogoComponent} from "./Component/ApplicationLogo/index";
import {ApplicationLoadingBarComponent} from "./Component/ApplicationLoadingBar/index";
import {AttachmentModule} from "../Attachment/AttachmentModule";
import {PostModule} from "../Post/PostModule";
import {Config} from "../../app/config";
import {VoteModule} from "../Vote/VoteModule";
import {TagModule} from "../Tag/TagModule";
import {HttpClientModule} from "@angular/common/http";

registerLocaleData(localeRu);

export function AuthHttpServiceFactory(http: Http, options: RequestOptions): AuthHttp {
    return new AuthHttp(new AuthConfig(), http, options);
}

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.init();
}

export function LocaleFactory(translationService: TranslationService) {
    let locale: Locale = translationService.getLocale();
    
    console.log(locale, Config.locale.aliases[locale][0]);
    
    return Config.locale.aliases[locale][0];
}

declare let Hammer: any;

@Injectable()
export class HammerConfig extends HammerGestureConfig  {
    buildHammer(element: HTMLElement) {
        return new Hammer(element, {
            touchAction: "pan-y",
        });
    }
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        AttachmentModule,
        AuthModule,
        FeedModule,
        PostModule,
        ProfileModule,
        SettingsModule,
        SidebarModule,
        TagModule,
        VoteModule,
        CommonModule,
        RESTModule.init(Config.uri.api, Config.auth.token_key)
    ],
    declarations: [
        ApplicationComponent,
        ApplicationLogoComponent,
        ApplicationLoadingBarComponent,
        ApplicationMainFrameComponent,
        ApplicationScrollButtonComponent,
        ForbiddenRoute,
        PageNotFoundRoute,
    ],
    providers: [
        StartupService,
        RouteHelperService,
        ApplicationScrollService,
        {
            provide: LOCALE_ID,
            useFactory: LocaleFactory,
            deps: [TranslationService]
        },
        {
            provide: AuthHttp,
            useFactory: AuthHttpServiceFactory,
            deps: [Http, RequestOptions]
        },
        { 
            provide: HAMMER_GESTURE_CONFIG,
            useClass: HammerConfig 
        },
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }
    ],
    exports: [ApplicationComponent]
})
export class ApplicationModule {}
