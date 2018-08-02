import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {Profile} from "../Entity/Profile";
import {ProfileRESTService} from "./ProfileRESTService";
import {Token} from "../../Auth/Entity/Token";
import {ProfileCreateUpdateRequest} from "../Http/Request/ProfileCreateUpdateRequest";
import {AuthService} from "../../Auth/Service/AuthService";
import {Response} from "../../Application/Http/Response";
import {AvatarUploadRequest} from "../Http/Request/AvatarUploadRequest";
import {BackdropUploadRequest} from "../Http/Request/BackdropUploadRequest";
import {BackdropPreset, BackdropPresets} from "../Entity/BackdropPreset";
import {BackdropPresetsResponse} from "../Http/Response/BackdropPresetsResponse";
import {TokenService} from "../../Auth/Service/TokenService";
import {makeStateKey, StateKey, TransferState} from "@angular/platform-browser";

interface ProfileServiceInterface {
    get(path: string): Observable<Profile>;
    edit(profile: Profile, request: ProfileCreateUpdateRequest, oldProfile: Profile): Observable<Profile>;
    checkAlias(alias: string): Observable<Response>;
    getOwnProfilePath(): string;
    getOwnProfile(): Observable<Profile>;
    isOwn(profile: Profile): boolean;
    isOwnProfileExist(): boolean;
}

@Injectable()
export class ProfileService implements ProfileServiceInterface{
    private profiles: Profile[] = [];
    private presets: BackdropPresets;

    constructor(
        private rest: ProfileRESTService, 
        private auth: AuthService, 
        private tokenService: TokenService,
        private transferState: TransferState
    ) {}

    public get(path: string): Observable<Profile> 
    {
        return this.getFromCache(path)
            .catch(() => this.getByPath(path).do(profile => this.saveToCache(profile, path)))
        ;
    }
   
    public edit(oldProfile: Profile, request: ProfileCreateUpdateRequest): Observable<Profile> 
    {
        return this.rest.update(oldProfile.id, request)
            .map(profileResponse => profileResponse.entity)
            .do(newProfile => {
                if(this.isOwn(newProfile)) {
                    this.replaceOwnProfileInCache(oldProfile, newProfile)
                }
            })
            .flatMap(newProfile => {
                if (oldProfile.alias != newProfile.alias) {
                    return this.auth.refreshToken({
                        "refresh_token": this.tokenService.getRefreshToken()
                    }).map(() => newProfile);
                } else {
                    return Observable.of(newProfile);
                }
            })
        ;
    }

    public checkAlias(alias: string): Observable<Response>
    {
        return this.rest.checkAlias(alias);
    }

    public uploadAvatar(profile: Profile, avatarUploadRequest: AvatarUploadRequest): Observable<Profile>
    {
        let oldProfile = profile;
        return this.rest.uploadAvatar(profile.id, avatarUploadRequest)
            .map(profileResponse => profileResponse.entity)
            .do(profile => {
                if(this.isOwn(profile)) {
                    this.replaceOwnProfileInCache(oldProfile, profile)
                }
            })
    }
    
    public uploadBackdrop(profile: Profile, backdropUploadRequest: BackdropUploadRequest): Observable<Profile>
    {
        let oldProfile = profile;
        return this.rest.uploadBackdrop(profile.id, backdropUploadRequest)
            .map(profileResponse => profileResponse.entity)
            .do(profile => {
                if(this.isOwn(profile)) {
                    this.replaceOwnProfileInCache(oldProfile, profile)
                }
            })        
    }
    
    public backdropPresets(): Observable<BackdropPresetsResponse> {
        return this.rest.backdropPresets()
            .do(presets => this.presets = presets);
    }

    public getPresets(asIterable?: boolean)
    {
        if(asIterable) {
            return Object.keys(this.presets).map(k => this.presets[k])
        } else {
            return this.presets;
        }
    }

    public setBackdropPreset(profile: Profile, preset: BackdropPreset): Observable<Profile>
    {
        let oldProfile = profile;
        return this.rest.setBackdropPreset(profile.id, preset["name"])
            .map(profileResponse => profileResponse.entity)
            .do(profile => {
                if(this.isOwn(profile)) {
                    this.replaceOwnProfileInCache(oldProfile, profile)
                }
            })        
    }

    public deleteBackdrop(profile: Profile): Observable<Profile>
    {
        let oldProfile = profile;
        return this.rest.deleteBackdrop(profile.id)
            .map(profileResponse => profileResponse.entity)
            .do(profile => {
                if(this.isOwn(profile)) {
                    this.replaceOwnProfileInCache(oldProfile, profile)
                }
            })        
    }

    public hasAvatar(profile: Profile) : boolean
    {
        // return Object.keys(profile.avatar).length > 0; @DOTO: remove this line
        return !!profile.avatar;
    }

    public hasBackdrop(profile: Profile) : boolean
    {
        return !!profile.backdrop;
    }

    public getOwnProfilePath(): string
    {
        let tokenData: Token = this.tokenService.decodeToken();
        return tokenData.profile_alias || tokenData.profile_id.toString();
    }

    public getOwnProfile(): Observable<Profile>
    {
        return this.get(this.getOwnProfilePath());
    }
    
    public isOwn(profile: Profile): boolean
    {
        try {
            let tokenData: Token = this.tokenService.decodeToken();
            return this.isOwnProfileExist() && tokenData.profile_id == profile.id;
        } catch (e) {
            return false;
        } 
    }
    
    public isOwnProfileExist(): boolean
    {
        try {
            let tokenData: Token = this.tokenService.decodeToken();
            return !!tokenData.profile_alias || !!tokenData.profile_id;
        } catch (e) {
            return false;
        }
    }

    public getProfileFirstLetters(profile: Profile): string
    {
        return profile.name
            .split(" ")
            .slice(0, 2)
            .map(item => item.charAt(0).toUpperCase())
            .join(" ")
        ;
    }

    private getFromCache(path: number | string): Observable<Profile> 
    {
        let profile: Profile = this.profiles.filter((profile) => profile.id == path || profile.alias == path).shift();

        let profileStateKey: StateKey<Profile> = makeStateKey<Profile>("profile-" + path);

        if(this.transferState.hasKey(profileStateKey)) {
            profile = this.transferState.get(profileStateKey, null as Profile);
        }
        
        if (!profile) {
            return Observable.throw(`Profile with path "${path}" is not cached`);
        }

        return Observable.of(profile).delay(1); // delay kostil' for angular resolver...
    }

    public saveToCache(profile: Profile, path: string): void
    {
        this.profiles.push(profile);

        let profileStateKey: StateKey<Profile> = makeStateKey<Profile>("profile-" + path);
        this.transferState.set(profileStateKey, profile as Profile)
    }

    private replaceOwnProfileInCache(oldProfile: Profile, newProfile: Profile): Observable<Profile>
    {
        let index: number = this.profiles.indexOf(oldProfile);

        if(!this.isOwn(newProfile)) {
            return Observable.throw("Replace in cache failed. Reason: profile is not own");
        }

        if (!~index) {
            console.error(`${index} not found in cache file`);
            return Observable.throw(`${index} not found in cache file`);
        }

        this.profiles[index] = newProfile;
        let profileStateKey: StateKey<Profile> = makeStateKey<Profile>("profile-" + this.getOwnProfilePath());
        this.transferState.set(profileStateKey, newProfile as Profile);
        
        return Observable.of(newProfile);
    }

    private getPathType(path: string): PathType
    {
        return /^\d+$/.test(path) ? "id" : "alias";
    }

    private getByPath(path: string): Observable<Profile>
    {
        switch (this.getPathType(path)) {
            case "id": return this.rest.getById(+path).map(profileResponse => profileResponse.entity);
            case "alias": return this.rest.getByAlias(path).map(profileResponse => profileResponse.entity);
        }
    }
}

type PathType = "id" | "alias";