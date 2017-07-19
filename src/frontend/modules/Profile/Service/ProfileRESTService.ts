import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";
import {Observable} from "rxjs";

import {ProfileCreateUpdateRequest} from "../Http/Request/ProfileCreateUpdateRequest";
import {ProfileResponse} from "../Http/Response/ProfileResponse";
import {CheckAliasResponse} from "../Http/Response/CheckAliasResponse";
import {AvatarUploadRequest} from "../Http/Request/AvatarUploadRequest";
import {BackdropUploadRequest} from "../Http/Request/BackdropUploadRequest";

@Injectable()
export class ProfileRESTService {

    constructor(private rest: RESTService) {}

    public getById(profileId: number): Observable<ProfileResponse> 
    {
        let url = `/profile/${profileId}/get-by-id`;

        return this.rest
            .get(url)
            .map(res => res.json())
    }

    public getByAlias(profileAlias: string): Observable<ProfileResponse> 
    {
        let url = `/profile/${profileAlias}/get-by-alias`;

        return this.rest
            .get(url)
            .map(res => res.json())
    }

    public create(profileCreateRequest: ProfileCreateUpdateRequest): Observable<ProfileResponse>
    {
        let url = `/protected/profile/create`;

        return this.rest
            .auth()
            .put(url, JSON.stringify(profileCreateRequest))
            .map(res => res.json())
    }

    public update(profileId: number, profileUpdateRequest: ProfileCreateUpdateRequest): Observable<ProfileResponse>
    {
        let url = `/protected/profile/${profileId}/update`;

        return this.rest
            .auth()
            .patch(url, JSON.stringify(profileUpdateRequest))
            .map(res => res.json())
    }

    public delete(profileId: number): Observable<ProfileResponse>
    {
        let url = `/profile/${profileId}/delete`;

        return this.rest
            .delete(url)
            .map(res => res.json())
    }
    
    public checkAlias(alias: string): Observable<CheckAliasResponse>
    {
        let url = `/profile/${alias}/check`;
        return this.rest
            .get(url)
            .map(res => res.json())
    }

    public uploadAvatar(profileId: number, avatarUploadRequest: AvatarUploadRequest): Observable<ProfileResponse>
    {
        let url = `/protected/profile/${profileId}/avatar/upload`;
        let formData = new FormData();

        for (let field in avatarUploadRequest) {
            formData.append(field, avatarUploadRequest[field]);
        }

        return this.rest.auth()
            .post(url, formData)
            .map(res => res.json())
        ;
    }

    public uploadBackdrop(profileId: number, backdropUploadRequest: BackdropUploadRequest): Observable<ProfileResponse>
    {
        let url = `/protected/profile/${profileId}/backdrop/upload`;
        let formData = new FormData();

        for (let field in backdropUploadRequest) {
            formData.append(field, backdropUploadRequest[field]);
        }

        return this.rest.auth()
            .post(url, formData)
            .map(res => res.json())
        ;
    }
}