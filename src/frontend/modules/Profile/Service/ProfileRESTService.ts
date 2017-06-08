import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt";

import {RESTService} from "../../Common/REST/Service/RESTService";
import {ProfileCreateUpdateRequest} from "../Http/Request/ProfileCreateUpdateRequest";
import {ProfileGetResponse} from "../Http/Response/ProfileGetResponse";

@Injectable()
export class ProfileRESTService {

    constructor(private rest: RESTService, private authHttp: AuthHttp) {}

    public getById(profileId: number): Observable<ProfileGetResponse> 
    {
        let url = `/profile/${profileId}/get-by-id`;

        return this.rest
            .get(url)
            .map(res => res.json())
    }

    public getByAlias(profileAlias: string): Observable<ProfileGetResponse> 
    {
        let url = `/profile/${profileAlias}/get-by-alias`;

        return this.rest
            .get(url)
            .map(res => res.json())
    }

    public create(profileCreateRequest: ProfileCreateUpdateRequest): Observable<ProfileGetResponse>
    {
        let url = "/protected/profile/create";

        return this.authHttp
            .put(url, JSON.stringify(profileCreateRequest))
            .map(res => res.json())
    }

    public update(profileId: number, profileUpdateRequest: ProfileCreateUpdateRequest): Observable<ProfileGetResponse>
    {
        let url = `/protected/profile/${profileId}/update`;

        return this.authHttp
            .post(url, JSON.stringify(profileUpdateRequest))
            .map(res => res.json())
    }

    public delete(profileId: number): Observable<ProfileGetResponse>
    {
        let url = `/profile/${profileId}/delete`;

        return this.rest
            .delete(url)
            .map(res => res.json())
    }
}