import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

@Injectable()
export class InfoPostRESTService {

    constructor(private http: HttpClient) {}

    public getInfoPostId(type: PostAlias): Observable<number> {
        let url = `/post/info/type/${type}`;

        return this.http
            .get<number>(url)
        ;
    }
}

type PostAlias = string;