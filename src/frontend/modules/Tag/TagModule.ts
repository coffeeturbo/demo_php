import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {TagRoute} from "./Route/TagRoute/index";
import {PostModule} from "../Post/PostModule";
import {CommonModule} from "../Common/CommonModule";
import {TagTitleResolver} from "./Service/TagTitleResolver";

@NgModule({
    imports:[
        CommonModule,
        RouterModule,
        PostModule
    ],
    declarations: [
        TagRoute
    ],
    providers: [
        TagTitleResolver
    ]
})
export class TagModule {} 