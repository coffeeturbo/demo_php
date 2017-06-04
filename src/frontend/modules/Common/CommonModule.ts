import {NgModule} from "@angular/core";

import {AutoFocusModule} from "./AutoFocus/AutoFocusModule";
import {ModalModule} from "./Modal/ModalModule";
import {TooltipModule} from "./Tooltip/TooltipModule";
import {NotImplementedModule} from "./NotImplemented/NotImplementedModule";
import {LoadingBoxModule} from "./LoadingBox/LoadingBoxModule";
import {LoadingBarModule} from "./LoadingBar/LoadingBarModule";
import {TranslateModule} from "./Translate/TranslateModule";
import {CommonModule as NgCommonModule} from "@angular/common";

@NgModule({
    exports: [
        NgCommonModule,
        LoadingBoxModule,
        LoadingBarModule,
        AutoFocusModule,
        ModalModule,
        TooltipModule,
        TranslateModule,
        NotImplementedModule
    ]
})
export class CommonModule {
}