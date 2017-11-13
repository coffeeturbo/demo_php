import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {VoteState} from "../Entity/Vote";
import {VoteRESTService} from "./VoteRESTService";

@Injectable()
export class VoteService {
    
    constructor(private rest: VoteRESTService) {}

    vote(postId:number, state: VoteState): Observable<any> {
        switch (state){
            case "none":
                return this.rest.deleteVotePost(postId);
            case "positive":
                return this.rest.positiveVotePost(postId);
            case "negative":
                return this.rest.negativeVotePost(postId);
        }
    }
}