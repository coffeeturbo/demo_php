import {NgModule} from "@angular/core";
import {ShareComponent} from "./Component/Share/index";
import {CommonModule} from "../Common/CommonModule";
import {RouterModule} from "@angular/router";

@NgModule({
    imports:[
        RouterModule,
        CommonModule
    ],
    declarations: [
        ShareComponent
    ],
    exports: [
        ShareComponent
    ]
})
export class ShareModule {} 