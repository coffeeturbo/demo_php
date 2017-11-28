import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {ProfileCreateUpdateRequest} from "../Http/Request/ProfileCreateUpdateRequest";
import {ProfileResponse} from "../Http/Response/ProfileResponse";
import {CheckAliasResponse} from "../Http/Response/CheckAliasResponse";
import {AvatarUploadRequest} from "../Http/Request/AvatarUploadRequest";
import {BackdropUploadRequest} from "../Http/Request/BackdropUploadRequest";
import {BackdropPresetsResponse} from "../Http/Response/BackdropPresetsResponse";

@Injectable()
export class ProfileRESTService
{
    constructor(private http: HttpClient) {}

    public getById(profileId: number): Observable<ProfileResponse>
    {
        let url = `/profile/${profileId}/get-by-id`;

        return this.http
            .get<ProfileResponse>(url)
        ;
    }

    public getByAlias(profileAlias: string): Observable<ProfileResponse>
    {
        let url = `/profile/${profileAlias}/get-by-alias`;
        return this.http
            .get<ProfileResponse>(url)
        ;
    }

    public create(profileCreateRequest: ProfileCreateUpdateRequest): Observable<ProfileResponse>
    {
        let url = `/protected/profile/create`;

        return this.http
            .put<ProfileResponse>(url, profileCreateRequest, {withCredentials: true})
        ;
    }

    public update(profileId: number, profileUpdateRequest: ProfileCreateUpdateRequest): Observable<ProfileResponse>
    {
        let url = `/protected/profile/${profileId}/update`;

        return this.http
            .patch<ProfileResponse>(url, profileUpdateRequest, {withCredentials: true})
        ;
    }

    public delete(profileId: number): Observable<ProfileResponse>
    {
        let url = `/profile/${profileId}/delete`;

        return this.http
            .delete<ProfileResponse>(url, {withCredentials: true})
        ;
    }

    public checkAlias(alias: string): Observable<CheckAliasResponse>
    {
        let url = `/profile/${alias}/check`;
        return this.http
            .get<CheckAliasResponse>(url)
        ;
    }

    public uploadAvatar(profileId: number, avatarUploadRequest: AvatarUploadRequest): Observable<ProfileResponse>
    {
        let url = `/protected/profile/${profileId}/avatar/upload`;
        let formData = new FormData();

        for (let field in avatarUploadRequest) {
            formData.append(field, avatarUploadRequest[field]);
        }

        return this.http
            .post<ProfileResponse>(url, formData, {withCredentials: true})
        ;
    }
    
    public uploadBackdrop(profileId: number, backdropUploadRequest: BackdropUploadRequest): Observable<ProfileResponse>
    {
        let url = `/protected/profile/${profileId}/backdrop/upload`;
        let formData = new FormData();

        for (let field in backdropUploadRequest) {
            formData.append(field, backdropUploadRequest[field]);
        }

        return this.http
            .post<ProfileResponse>(url, formData, {withCredentials: true})
        ;
    }

    public deleteBackdrop(profileId: number): Observable<ProfileResponse>
    {
        let url = `/protected/profile/${profileId}/backdrop/delete`;

        return this.http
            .delete<ProfileResponse>(url, {withCredentials: true})
        ;
    }

    public backdropPresets(): Observable<BackdropPresetsResponse>
    {
        let url = `/protected/profile/backdrop/presets`;

        return this.http
            .get<BackdropPresetsResponse>(url, {withCredentials: true})
        ;
    }

    public setBackdropPreset(profileId: number, presetName: string): Observable<ProfileResponse>
    {
        let url = `/protected/profile/${profileId}/backdrop/preset/${presetName}/set`;

        return this.http
            .post<ProfileResponse>(url, null, {withCredentials: true})
        ;
    }
}