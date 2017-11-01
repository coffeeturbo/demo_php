import {NgModule} from "@angular/core";
import {VoteService} from "./Service/VoteService";
import {VoteRESTService} from "./Service/VoteRESTService";

@NgModule({
    providers: [
        VoteRESTService,
        VoteService
    ]
})
export class VoteModule {} 