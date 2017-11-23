import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";

import {PostCreateRequest} from "../Http/Request/PostCreateRequest";
import {Observable} from "rxjs";
import {Post} from "../Entity/Post";
import {AuthService} from "../../Auth/Service/AuthService";

@Injectable()
export class PostRESTService
{
    constructor(private rest: RESTService, private authService: AuthService) {}
    
    public getById(postId: number): Observable<Post>
    {
        let url = `/post/${postId}/get-by-id`;

        if(this.authService.isSignedIn()) {
            this.rest = this.rest.auth()
        }

        return this.rest
            .get(url)
            .map(res => res.json())
        
    }

    public create(postCreateRequest: PostCreateRequest): Observable<Post>
    {
        let url = `/protected/post/create`;

        return this.rest
            .auth()
            .put(url, JSON.stringify(postCreateRequest))
            .map(res => res.json())
    }
}