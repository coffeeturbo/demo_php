import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {TagRoute} from "./Route/TagRoute/index";
import {PostModule} from "../Post/PostModule";
import {CommonModule} from "../Common/CommonModule";
import {TagTitleResolver} from "./Service/TagTitleResolver";
import {TagRESTService} from "./Service/TagRESTService";

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
        TagTitleResolver,
        TagRESTService
    ]
})
export class TagModule {} 