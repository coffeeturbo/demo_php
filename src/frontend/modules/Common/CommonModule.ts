import {NgModule} from "@angular/core";
import {CommonModule as NgCommonModule} from "@angular/common";
import {FocusModule} from "@angular-addons/focus";
import {ModalModule} from "@angular-addons/modal";
import {LoadingBarModule} from "@angular-addons/loading-bar";

import {TooltipModule} from "./Tooltip/TooltipModule";
import {NotImplementedModule} from "./NotImplemented/NotImplementedModule";
import {LoadingBoxModule} from "./LoadingBox/LoadingBoxModule";
import {TranslateModule} from "./Translate/TranslateModule";


@NgModule({
    exports: [
        NgCommonModule,
        LoadingBoxModule,
        LoadingBarModule,
        FocusModule,
        ModalModule,
        TooltipModule,
        TranslateModule,
        NotImplementedModule
    ]
})
export class CommonModule {
}