import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";

@Injectable()
export class PostRESTService
{
    constructor(private rest: RESTService) {}
    getById(postId: number) {
        let url = `/post/${postId}/get-by-id`;

        return this.rest
            .get(url)
            .map(res => res.json())
        
    }
}