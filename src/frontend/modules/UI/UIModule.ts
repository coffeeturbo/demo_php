import {NgModule} from "@angular/core";

import {LoaderModule} from "./Loader/LoaderModule";
import {AutoFocusModule} from "./AutoFocus/AutoFocusModule";
import {ModalModule} from "./Modal/ModalModule";
import {TooltipModule} from "./Tooltip/TooltipModule";
import {NotImplementedModule} from "./NotImplemented/NotImplementedModule";

@NgModule({
    exports: [
        LoaderModule,
        AutoFocusModule,
        ModalModule,
        TooltipModule,
        NotImplementedModule
    ]
})
export class UIModule {} 