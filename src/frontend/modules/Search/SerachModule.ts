import {NgModule} from "@angular/core";
import {SearchRESTService} from "./Service/SearchRESTService";
import {SearchFeedResolver} from "./Service/SearchFeedResolver";
import {SearchRequestResolver} from "./Service/SearchFeedRequestResolver";

@NgModule({
    providers: [
        SearchRESTService,
        SearchFeedResolver,
        SearchRequestResolver
    ]
})
export class SerachModule {}