import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";
import {Observable} from "rxjs";

import {Feed} from "../Entity/Feed";
import {AuthService} from "../../Auth/Service/AuthService";

@Injectable()
export class FeedRESTService {
    constructor(private rest: RESTService, private authService: AuthService) {}
    
    public getByProfile(profileId: number, limit: number = 0, offset: number = 0) : Observable<Feed> 
    {
        let url = `/feed/profile/${profileId}/limit/${limit}/offset/${offset}`;

        if(this.authService.isSignedIn()) {
            return this.rest
                .auth()
                .get(url)
                .map(res => res.json())
            ;
        } else {
            return this.rest
                .get(url)
                .map(res => res.json())
            ;
        }
    }
}