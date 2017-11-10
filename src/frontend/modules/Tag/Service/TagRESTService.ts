import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";
import {Observable} from "rxjs/Observable";

import {Tag} from "../Entity/Tag";

@Injectable()
export class TagRESTService
{
    constructor(private rest: RESTService) {}

    public create(tagCreateRequest: Tag): Observable<Tag[]>
    {

        let url = `/protected/tag/create`;

        return this.rest
            .put(url, tagCreateRequest)
            .map(res => res.json())
    }
    
    public search(query: string): Observable<Tag[]>
    {
        let url = `/tag/search/${query}`;

        return this.rest
            .get(url)
            .map(res => res.json())
    }
}