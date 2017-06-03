import {NgModule} from "@angular/core";

import {AutoFocusModule} from "./AutoFocus/AutoFocusModule";
import {ModalModule} from "./Modal/ModalModule";
import {TooltipModule} from "./Tooltip/TooltipModule";
import {NotImplementedModule} from "./NotImplemented/NotImplementedModule";
import {LoadingBoxModule} from "./LoadingBox/LoadingBoxModule";
import {LoadingBarModule} from "./LoadingBar/LoadingBarModule";

@NgModule({
    exports: [
        LoadingBoxModule,
        LoadingBarModule,
        AutoFocusModule,
        ModalModule,
        TooltipModule,
        NotImplementedModule
    ]
})
export class UIModule {} 