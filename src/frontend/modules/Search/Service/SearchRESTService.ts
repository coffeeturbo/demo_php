import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Autocomplete} from "../Entity/Autocomplete";
import {Observable} from "rxjs/Observable";
import {SearchRequest} from "../Http/Request/SerachRequest";
import {Feed} from "../../Feed/Entity/Feed";

@Injectable()
export class SearchRESTService 
{
    constructor(private http: HttpClient) {}
    
    public autocomplete(query: string): Observable<Autocomplete[]>
    {
        let url = `/search/addition/${query}`;

        return this.http.
            get<Autocomplete[]>(url)
        ;
    }

    public search(searchRequest: SearchRequest): Observable<Feed>
    {
        let url = `/search/full/${searchRequest.query}`;

        return this.http.
            get<Feed>(url, {params: searchRequest.params, withCredentials: true})
        ;
    }
}