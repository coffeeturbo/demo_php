import {EventEmitter, Injectable} from "@angular/core";
import {Observable, Observer} from "rxjs";

import {Profile} from "../Entity/Profile";
import {ProfileRESTService} from "./ProfileRESTService";
import {ProfileGetResponse} from "../Http/Response/ProfileGetResponse";
import {Token} from "../../Auth/Entity/Token";
import {TokenRepository} from "../../Auth/Repository/TokenRepository";
import {ProfileCreateUpdateRequest} from "../Http/Request/ProfileCreateUpdateRequest";
import {AuthService} from "../../Auth/Service/AuthService";
import {CheckAliasResponse} from "../Http/Response/CheckAliasResponse";
import {AvatarUploadRequest} from "../Http/Request/AvatarUploadRequest";

interface ProfileServiceInterface {
    get(path: string): Observable<Profile>;
    edit(profile: Profile, request: ProfileCreateUpdateRequest, oldProfile: Profile): Observable<Profile>;
    checkAlias(alias: string): Observable<CheckAliasResponse>;
    getOwnProfilePath(): string;
    getOwnProfile(): Observable<Profile>;
    isOwnProfileExist(): boolean;
}

@Injectable()
export class ProfileService implements ProfileServiceInterface{
    private profiles: Profile[] = [];
    public onProfileResolve = new EventEmitter<Profile>(true);

    constructor(private rest: ProfileRESTService, private auth: AuthService) {}

    public get(path: string): Observable<Profile> 
    {
        let profileObservable: Observable<Profile>;
        try {
            profileObservable = this.getFromCache(path);
        } catch (e) {
            let profileGetResponseObservable: Observable<ProfileGetResponse>;

            switch (this.getPathType(path)) {
                case "id":
                    profileGetResponseObservable = this.rest.getById(+path);
                    break;
                case "alias":
                    profileGetResponseObservable = this.rest.getByAlias(path);
                    break;
            }

            profileObservable = profileGetResponseObservable
                .map(profileGetResponse => profileGetResponse.entity)
                .do(profile => this.saveToCache(profile))
            ;
        }

        return profileObservable
            .do(profile => this.onProfileResolve.emit(profile))
        ;
    }
    
    public edit(profile: Profile, request: ProfileCreateUpdateRequest, oldProfile: Profile): Observable<Profile> {
        return this.rest.update(profile.id, request)
            .map(profileGetResponse => profileGetResponse.entity)
            .do(profile => this.replaceInCache(oldProfile, profile))
            .flatMap(profile => {
                if (oldProfile.alias != profile.alias) {
                    return this.auth.refreshToken({
                        "refresh_token": TokenRepository.getRefreshToken()
                    }).map(() => profile);
                } else {
                    return Observable.of(profile);
                }
            })
            ;
    }

    public checkAlias(alias: string): Observable<CheckAliasResponse>
    {
        return this.rest.checkAlias(alias);
    }

    public uploadAvatar(profile: Profile, avatarUploadRequest: AvatarUploadRequest): Observable<Profile>
    {
        let oldProfile = profile;
        return this.rest.uploadAvatar(profile.id, avatarUploadRequest)
            .map(profileGetResponse => profileGetResponse.entity)
            .do(profile => this.replaceInCache(oldProfile, profile))
    }
    
    public hasAvatar(profile: Profile) : boolean
    {
        return Object.keys(profile.avatar).length > 0;
    }

    public getOwnProfilePath(): string
    {
        let tokenData: Token = TokenRepository.decodeToken();
        return tokenData.profile_alias || tokenData.profile_id.toString();
    }

    public getOwnProfile(): Observable<Profile>
    {
        return this.get(this.getOwnProfilePath());
    }
    
    public isOwnProfileExist(): boolean
    {
        let tokenData: Token = TokenRepository.decodeToken();
        return !!tokenData.profile_alias || !!tokenData.profile_id;
    }

    private getFromCache(path: number | string): Observable<Profile> 
    {
        let profile: Profile = this.profiles.filter((profile) => profile.id == path || profile.alias == path).shift();
        if (!profile) {
            throw new Error(`Profile with path "${path}" is not cached`);
        }

        return Observable.of(profile);
    }

    private saveToCache(profile: Profile): void
    {
        this.profiles.push(profile);
    }

    private replaceInCache(oldProfile: Profile, newProfile: Profile): void
    {
        let index: number = this.profiles.indexOf(oldProfile);
        if (index != -1) {
            this.profiles[this.profiles.indexOf(oldProfile)] = newProfile;
        } else throw new Error(`${index} not found in cache file`);
    }

    private getPathType(path: string): PathType
    {
        return /^\d+$/.test(path) ? "id" : "alias";
    }
}

type PathType = "id" | "alias";