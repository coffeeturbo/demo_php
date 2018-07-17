import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

import {Feed} from "../../Feed/Entity/Feed";

@Injectable()
export class InfoPostRESTService {

    constructor(private http: HttpClient) {}

    public getInfoPosts(): Observable<Feed> {
        let url = `/post/info`;

        return this.http
            .get<Feed>(url)
        ;
    }
    
    public getInfoPostId(postAlias: PostAlias): Observable<number> {
        return Observable.of(1);
    }
}

type PostAlias = string;