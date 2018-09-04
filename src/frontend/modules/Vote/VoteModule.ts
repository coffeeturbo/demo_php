import {NgModule} from "@angular/core";
import {VoteService} from "./Service/VoteService";
import {VoteRESTService} from "./Service/VoteRESTService";
import {VoteFeedRequestResolver} from "./Service/VoteFeedRequestResolver";

@NgModule({
    providers: [
        VoteRESTService,
        VoteFeedRequestResolver,
        VoteService
    ]
})
export class VoteModule {} 