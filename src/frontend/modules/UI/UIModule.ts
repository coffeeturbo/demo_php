import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {LoaderComponent} from "./Component/Loader/index";
import {ModalComponents} from "./Component/Modal/index";
import {NotImplementedComponent} from "./Component/NotImplemented/index";
import {TooltipComponent} from "./Component/Tooltip/index";
import {AutoFocusDirective} from "./Directive/AutoFocusDirective";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
    ],
    declarations: [
        AutoFocusDirective,
        LoaderComponent,
        ModalComponents,
        NotImplementedComponent,
        TooltipComponent
    ],
    exports: [
        AutoFocusDirective,
        LoaderComponent,
        ModalComponents,
        NotImplementedComponent,
        TooltipComponent
    ]
})
export class UIModule {} 