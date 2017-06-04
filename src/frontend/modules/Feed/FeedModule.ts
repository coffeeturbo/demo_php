import {NgModule} from "@angular/core";

import {FeedRoute} from "./Route/FeedRoute/index";
import {UIModule} from "../UI/UIModule";

@NgModule({
    imports: [
        UIModule
    ],
    declarations: [
        FeedRoute,
    ]
})
export class FeedModule {} 