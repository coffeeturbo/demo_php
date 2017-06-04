import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";

import {RESTService} from "../../Application/Service/RESTService";
import {ProfileCreateUpdateRequest} from "../Http/Request/ProfileCreateUpdateRequest";
import {ProfileGetResponse} from "../Http/Response/ProfileGetResponse";
import {Gender} from "../Entity/Gender";

@Injectable()
export class ProfileRESTService {

    constructor(private rest: RESTService) {}

    public getById(profileId: number): Observable<ProfileGetResponse> 
    {
        let url = `/profile/${profileId}/get`;

        return this.rest
            .get(url)
            .map(res => res.json())
    }

    public getByAlias(profileAlias: string): Observable<ProfileGetResponse> 
    {
        return Observable.of({
            "entity": {
                "id": 1,
                "gender": Gender.Male,
                "nickname": "hck",
                "first_name": "Артём",
                "last_name": "Байдин",
                "patronymic": "Георгиевич",
                "alias": "killers",
                "birth_date": "17-08-1991",
                "verified": false,
                "created": "2017-06-01T09:09:41+00:00"
            }
        }).delay(1000);
    }

    public create(profileCreateRequest: ProfileCreateUpdateRequest): Observable<ProfileGetResponse>
    {
        let url = "/protected/profile/create";

        return this.rest.authHttp
            .put(url, JSON.stringify(profileCreateRequest))
            .map(res => res.json())
    }

    public update(profileId: number, profileUpdateRequest: ProfileCreateUpdateRequest): Observable<ProfileGetResponse>
    {
        let url = `/protected/profile/${profileId}/update`;

        return this.rest.authHttp
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