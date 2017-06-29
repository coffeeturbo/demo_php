import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";
import {Observable, Observer} from "rxjs";
import {AuthHttp} from "angular2-jwt";

import {ProfileCreateUpdateRequest} from "../Http/Request/ProfileCreateUpdateRequest";
import {ProfileGetResponse} from "../Http/Response/ProfileGetResponse";
import {Config} from "../../../app/config";
import {CheckAliasResponse} from "../Http/Response/CheckAliasResponse";
import {AvatarUploadRequest} from "../Http/Request/AvatarUploadRequest";
import {TokenRepository} from "../../Auth/Repository/TokenRepository";

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
        let url = `/protected/profile/create`;

        return this.authHttp
            .put(url, JSON.stringify(profileCreateRequest))
            .map(res => res.json())
    }

    public update(profileId: number, profileUpdateRequest: ProfileCreateUpdateRequest): Observable<ProfileGetResponse>
    {
        let url = `${Config.uri.api}/protected/profile/${profileId}/update`;

        return this.authHttp
            .patch(url, JSON.stringify(profileUpdateRequest))
            .map(res => res.json())
    }

    public delete(profileId: number): Observable<ProfileGetResponse>
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

    public uploadAvatar(profileId: number, avatarUploadRequest: AvatarUploadRequest): Observable<ProfileGetResponse>
    {
        let url = `/protected/profile/${profileId}/avatar/upload`;
        let formData = new FormData();

        for (let field in avatarUploadRequest) {
            formData.append(field, avatarUploadRequest[field]);
        }

        let xhrRequest = new XMLHttpRequest();

        xhrRequest.open("POST", Config.uri.api + url);
        xhrRequest.setRequestHeader('Authorization', 'Bearer ' + TokenRepository.getToken());
        xhrRequest.send(formData);

        return Observable.create((observer: Observer<ProfileGetResponse>) => {
            xhrRequest.onreadystatechange = () => {
                if (xhrRequest.readyState === 4) {
                    if (xhrRequest.status >= 200 && xhrRequest.status < 300) {
                        observer.next(xhrRequest.response);
                        observer.complete();
                    } else {
                        observer.error(xhrRequest.response);
                    }
                }
            }
        });
    }
}