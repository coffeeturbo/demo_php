import { Injectable } from '@angular/core';

import {RESTService} from "../../Application/Service/RESTService";
import {ProfileCreateUpdateRequest} from "../Http/Request/ProfileCreateUpdateRequest";
import {Observable} from "rxjs";
import {ProfileGetResponse} from "../Http/Response/ProfileGetResponse";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";

@Injectable()
export class ProfileRESTService {

    constructor(private rest: RESTService){}

    public get(profileId: number): Observable<ProfileGetResponse | ResponseFailure>
    {
        let url = `/profile/${profileId}/get`;
        
        return this.rest
            .get(url)
            .map(res => res.json())
    }

    public create(profileCreateRequest:ProfileCreateUpdateRequest): Observable<ProfileGetResponse | ResponseFailure>
    {
        let url = "/protected/profile/create";
        
        return this.rest.authHttp
            .put(url, JSON.stringify(profileCreateRequest))
            .map(res => res.json())
    }

    public update(profileId: number, profileUpdateRequest:ProfileCreateUpdateRequest): Observable<ProfileGetResponse | ResponseFailure>
    {
        let url = `/protected/profile/${profileId}/update`;
        
        return this.rest.authHttp
            .post(url, JSON.stringify(profileUpdateRequest))
            .map(res => res.json())
    }
    
    public delete(profileId: number) {
        let url = `/profile/${profileId}/delete`;

        return this.rest
            .delete(url)
            .map(res => res.json())        
    }
}