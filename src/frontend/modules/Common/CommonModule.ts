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
import {PluralizeModule} from "./Pluralize/PluralizeModule";
import {CapitalizeModule} from "./Capitalize/CapitalizeModule";
import {PalleteModule} from "./Pallete/PalleteModule";
import {MaterialFormModule} from "./MaterialForm/MaterialFormModule";
import {ReactiveFormsModule} from "@angular/forms";
import {ChromeAutoFillModule} from "./ChromeAutoFill/ChromeAutoFillModule";
import {DateModule} from "./Date/DateModule";
import {ClickOutModule} from "./ClickOut/ClickOutModule";
import {ConfirmationModule} from "./Confirmation/ConfirmationModule";

@NgModule({
    imports: [
        TranslationModule.setConfig(dictionaries, <Locale>Config.locale.default, Config.locale.aliases)
    ],
    exports: [
        CropperModule,
        CapitalizeModule,
        ChromeAutoFillModule,
        ConfirmationModule,
        NgCommonModule,
        LoadingBoxModule,
        LoadingBarModule,
        ReactiveFormsModule,
        FocusModule,
        ModalModule,
        MaterialFormModule,
        TooltipModule,
        TranslationModule,
        PluralizeModule,
        PalleteModule,
        NotImplementedModule,
        DateModule,
        ClickOutModule
    ]
})
export class CommonModule {
}