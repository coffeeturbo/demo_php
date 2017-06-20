import {APP_INITIALIZER, LOCALE_ID, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {Http, HttpModule, RequestOptions} from "@angular/http";
import {RESTModule} from "@angular-addons/rest";
import {Locale} from "@angular-addons/translate";
import {AuthConfig, AuthHttp} from "angular2-jwt";

import "hammerjs";

import {appRoutes} from "../../app/routes";
import "../../assets/styles/index.scss";

import {ApplicationComponent} from "./Component/Application/index";
import {ForbiddenRoute} from "./Route/ForbiddenRoute/index";
import {PageNotFoundRoute} from "./Route/PageNotFoundRoute/index";
import {StartupService} from "./Service/StartupService";

import {AuthModule} from "../Auth/AuthModule";
import {CommonModule} from "../Common/CommonModule";
import {SidebarModule} from "../Sidebar/SidebarModule";
import {SettingsModule} from "../Settings/SettingsModule";
import {FeedModule} from "../Feed/FeedModule";
import {ProfileModule} from "../Profile/ProfileModule";
import {RouteHelperService} from "./Service/RouteHelperService";
import {ApplicationLogoComponent} from "./Component/ApplicationLogo/index";
import {ApplicationLoadingBarComponent} from "./Component/ApplicationLoadingBar/index";
import {AttachmentModel} from "../Attachment/AttachmentModel";
import {PostModule} from "../Post/PostModule";
import {Config} from "../../app/config";
import {TranslationService} from "../../../../../@angular2-addons/translation/module/Service/TranslationService";

export function AuthHttpServiceFactory(http: Http, options: RequestOptions): AuthHttp {
    return new AuthHttp(new AuthConfig(), http, options);
}

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.init();
}

export function LocaleFactory(translationService: TranslationService) {
    let locale: Locale = translationService.getLocale();
    return Config.locale.aliases[locale][0];
}

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        AttachmentModel,
        AuthModule,
        FeedModule,
        PostModule,
        ProfileModule,
        SettingsModule,
        SidebarModule,
        CommonModule,
        RESTModule.setPath(Config.uri.api)
    ],
    declarations: [
        ApplicationComponent,
        ApplicationLogoComponent,
        ApplicationLoadingBarComponent,
        ForbiddenRoute,
        PageNotFoundRoute,
    ],
    providers: [
        StartupService,
        RouteHelperService,
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
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [StartupService],
            multi: true
        }
    ],
    bootstrap: [ApplicationComponent]
})
export class AppModule {}
