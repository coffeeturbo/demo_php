import {EventEmitter, Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {Profile} from "../Entity/Profile";
import {ProfileRESTService} from "./ProfileRESTService";
import {ProfileGetResponse} from "../Http/Response/ProfileGetResponse";
import {Token} from "../../Auth/Entity/Token";
import {TokenRepository} from "../../Auth/Repository/TokenRepository";
import {ProfileCreateUpdateRequest} from "../Http/Request/ProfileCreateUpdateRequest";
import {AuthService} from "../../Auth/Service/AuthService";
import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
import {CheckAliasResponse} from "../Http/Response/CheckAliasResponse";

@Injectable()
export class ProfileService {
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
    
    public edit(profile: Profile, request: ProfileCreateUpdateRequest, oldProfile: Profile): Observable<Profile>
    {
        return this.rest.update(profile.id, request)
            .map(profileGetResponse => profileGetResponse.entity)
            .do(profile => {
                this.replaceInCache(oldProfile, profile);
                if(oldProfile.alias != profile.alias) { 
                    this.auth.refreshToken({"refresh_token": TokenRepository.getRefreshToken()});
                }
            })
        ;
    }

    public checkAlias(alias: string): Observable<CheckAliasResponse>
    {
        return this.rest.checkAlias(alias);
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

    public saveToCache(profile: Profile): void
    {
        this.profiles.push(profile);
    }

    public replaceInCache(oldProfile: Profile, newProfile: Profile): void
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