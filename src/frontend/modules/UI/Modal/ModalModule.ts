import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";

import {ModalComponent} from "./Component/Modal/index";
import {ModalBodyComponent} from "./Component/Modal/layout/ModalBodyComponent/index";
import {ModalHeaderComponent} from "./Component/Modal/layout/ModalHeaderComponent/index";
import {ModalFooterComponent} from "./Component/Modal/layout/ModalFooterComponent/index";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ModalComponent,
        ModalHeaderComponent,
        ModalFooterComponent,
        ModalBodyComponent
    ],
    exports: [
        ModalComponent,
        ModalHeaderComponent,
        ModalFooterComponent,
        ModalBodyComponent
    ]
})
export class ModalModule {}