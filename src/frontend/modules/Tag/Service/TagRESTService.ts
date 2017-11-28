import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {Tag} from "../Entity/Tag";

@Injectable()
export class TagRESTService
{
    constructor(private http: HttpClient) {}

    public create(tagCreateRequest: Tag): Observable<Tag[]>
    {
        let url = `/protected/tag/create`;

        return this.http
            .put<Tag[]>(url, tagCreateRequest, {withCredentials: true})
        ;
    }

    public search(query: string): Observable<Tag[]>
    {
        let url = `/tag/search/${query}`;

        return this.http
            .get<Tag[]>(url, {withCredentials: true})
        ;
    }
}