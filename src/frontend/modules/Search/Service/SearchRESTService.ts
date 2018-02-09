import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AutocompleteResponse} from "../Http/Response/AutocompleteResponse";
import {Observable} from "rxjs/Observable";
import {SerachRequest} from "../Http/Request/SerachRequest";
import {Feed} from "../../Feed/Entity/Feed";

@Injectable()
export class SearchRESTService 
{
    constructor(private http: HttpClient) {}
    
    public autocomplete(query: string)
    {
        let url = `/search/addition/${query}`;

        return this.http.
            get<AutocompleteResponse>(url)
        ;
    }

    public search(query: string, searchRequest: SerachRequest): Observable<Feed>
    {
        let url = ` /search/full/${query}`;

        return this.http.
            get<Feed>(url, {params: searchRequest, withCredentials: true})
        ;
    }
}