import {NgModule} from "@angular/core";
import {CommonModule as NgCommonModule} from "@angular/common";
import {FocusModule} from "@angular-addons/focus";
import {ModalModule} from "@angular-addons/modal";
import {LoadingBarModule} from "@angular-addons/loading-bar";
import {TranslationModule, Locale} from "@angular-addons/translate";

import {TooltipModule} from "./Tooltip/TooltipModule";
import {NotImplementedModule} from "./NotImplemented/NotImplementedModule";
import {LoadingBoxModule} from "./LoadingBox/LoadingBoxModule";
import {Config} from "../../app/config";
import {dictionaries} from "../../translations/dictionaries";
import {CropperModule} from "./Cropper/CropperModule";


@NgModule({
    imports: [
        TranslationModule.setConfig(dictionaries, <Locale>Config.locale.default, Config.locale.aliases)
    ],
    exports: [
        CropperModule,
        NgCommonModule,
        LoadingBoxModule,
        LoadingBarModule,
        FocusModule,
        ModalModule,
        TooltipModule,
        TranslationModule,
        NotImplementedModule
    ]
})
export class CommonModule {
}