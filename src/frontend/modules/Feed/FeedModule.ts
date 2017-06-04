import {NgModule} from "@angular/core";

import {FeedRoute} from "./Route/FeedRoute/index";
import {CommonModule} from "../Common/CommonModule";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FeedRoute,
    ]
})
export class FeedModule {} 