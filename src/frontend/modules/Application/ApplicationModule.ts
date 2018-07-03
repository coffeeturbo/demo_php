import {APP_INITIALIZER, Injectable, LOCALE_ID, NgModule} from "@angular/core";
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {registerLocaleData} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import localeRu from '@angular/common/locales/ru';

import {RESTModule} from "../Common/REST/RESTModule";
import {Locale, TranslationService} from "@angular-addons/translate";

import {appRoutes} from "../../app/routes";
import "../../assets/styles/index.scss";

import {ApplicationComponent} from "./Component/Application";
import {ApplicationMainFrameComponent} from "./Component/ApplicationMain";
import {ApplicationScrollButtonComponent} from "./Component/ApplicationScrollButton";
import {ForbiddenRoute} from "./Route/ForbiddenRoute";
import {PageNotFoundRoute} from "./Route/PageNotFoundRoute";
import {StartupService} from "./Service/StartupService";
import {AuthModule} from "../Auth/AuthModule";
import {CommonModule} from "../Common/CommonModule";
import {SidebarModule} from "../Sidebar/SidebarModule";
import {SettingsModule} from "../Settings/SettingsModule";
import {FeedModule} from "../Feed/FeedModule";
import {ProfileModule} from "../Profile/ProfileModule";
import {ApplicationScrollService} from "./Service/ApplicationScrollService";
import {RouteHelperService} from "./Service/RouteHelperService";
import {ApplicationLogoComponent} from "./Component/ApplicationLogo";
import {ApplicationLoadingBarComponent} from "./Component/ApplicationLoadingBar";
import {AttachmentModule} from "../Attachment/AttachmentModule";
import {PostModule} from "../Post/PostModule";
import {Config} from "../../app/config";
import {VoteModule} from "../Vote/VoteModule";
import {TagModule} from "../Tag/TagModule";
import {ShareModule} from "../Share/ShareModule";
import {PlatformService} from "./Service/PlatformService";
import {SerachModule} from "../Search/SerachModule";

registerLocaleData(localeRu);

export function StartupServiceFactory(startupService: StartupService): Function {
    return () => startupService.init();
}

export function LocaleFactory(translationService: TranslationService) {
    let locale: Locale = translationService.getLocale();
    
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
        HttpClientModule,
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
        ShareModule,
        SerachModule,
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
        PlatformService,
        FaviconService,
        {
            provide: LOCALE_ID,
            useFactory: LocaleFactory,
            deps: [TranslationService]
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
