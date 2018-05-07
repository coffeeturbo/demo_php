import {EventEmitter, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {Profile} from "../Entity/Profile";
import {ProfileRESTService} from "./ProfileRESTService";
import {ProfileResponse} from "../Http/Response/ProfileResponse";
import {Token} from "../../Auth/Entity/Token";
import {ProfileCreateUpdateRequest} from "../Http/Request/ProfileCreateUpdateRequest";
import {AuthService} from "../../Auth/Service/AuthService";
import {CheckAliasResponse} from "../Http/Response/CheckAliasResponse";
import {AvatarUploadRequest} from "../Http/Request/AvatarUploadRequest";
import {BackdropUploadRequest} from "../Http/Request/BackdropUploadRequest";
import {BackdropPreset, BackdropPresets} from "../Entity/BackdropPreset";
import {BackdropPresetsResponse} from "../Http/Response/BackdropPresetsResponse";
import {TokenService} from "../../Auth/Service/TokenService";
import {makeStateKey, StateKey, TransferState} from "@angular/platform-browser";

interface ProfileServiceInterface {
    get(path: string): Observable<Profile>;
    edit(profile: Profile, request: ProfileCreateUpdateRequest, oldProfile: Profile): Observable<Profile>;
    checkAlias(alias: string): Observable<CheckAliasResponse>;
    getOwnProfilePath(): string;
    getOwnProfile(): Observable<Profile>;
    isOwn(profile: Profile): boolean;
    isOwnProfileExist(): boolean;
}

@Injectable()
export class ProfileService implements ProfileServiceInterface{
    private profiles: Profile[] = [];
    private presets: BackdropPresets;
    public onProfileResolve = new EventEmitter<Profile>(true);

    constructor(
        private rest: ProfileRESTService, 
        private auth: AuthService, 
        private tokenService: TokenService,
        private transferState: TransferState
    ) {
    }

    public get(path: string): Observable<Profile> 
    {
        let profileObservable: Observable<Profile>;
        try {
            profileObservable = this.getFromCache(path);
        } catch (e) {
            let profileResponseObservable: Observable<ProfileResponse>;

            switch (this.getPathType(path)) {
                case "id":
                    profileResponseObservable = this.rest.getById(+path);
                    break;
                case "alias":
                    profileResponseObservable = this.rest.getByAlias(path);
                    break;
            }

            profileObservable = profileResponseObservable
                .map(profileResponse => profileResponse.entity)
                .do(profile => this.saveToCache(profile, path))
            ;
        }

        return profileObservable.do(profile => this.onProfileResolve.emit(profile));
    }
    
    public edit(profile: Profile, request: ProfileCreateUpdateRequest, oldProfile: Profile): Observable<Profile> {
        return this.rest.update(profile.id, request)
            .map(profileResponse => profileResponse.entity)
            .do(profile => this.replaceInCache(oldProfile, profile))
            .flatMap(profile => {
                if (oldProfile.alias != profile.alias) {
                    return this.auth.refreshToken({
                        "refresh_token": this.tokenService.getRefreshToken()
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
            .map(profileResponse => profileResponse.entity)
            .do(profile => this.replaceInCache(oldProfile, profile))
    }
    
    public uploadBackdrop(profile: Profile, backdropUploadRequest: BackdropUploadRequest): Observable<Profile>
    {
        let oldProfile = profile;
        return this.rest.uploadBackdrop(profile.id, backdropUploadRequest)
            .map(profileResponse => profileResponse.entity)
            .do(profile => this.replaceInCache(oldProfile, profile))
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
            .do(profile => this.replaceInCache(oldProfile, profile))
    }

    public deleteBackdrop(profile: Profile): Observable<Profile>
    {
        let oldProfile = profile;
        return this.rest.deleteBackdrop(profile.id)
            .map(profileResponse => profileResponse.entity)
            .do(profile => this.replaceInCache(oldProfile, profile))
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
        // if(!this.auth.isSignedIn()) {
        //     return false;
        // }

        try {
            let tokenData: Token = this.tokenService.decodeToken();
            return this.isOwnProfileExist() && tokenData.profile_id == profile.id;
        } catch (e) {
            return false;
        } 
    }
    
    public isOwnProfileExist(): boolean
    {
        // if(!this.auth.isSignedIn()) {
        //     return false;
        // }
        
        try {
            let tokenData: Token = this.tokenService.decodeToken();
            return !!tokenData.profile_alias || !!tokenData.profile_id;
        } catch (e) {
            return false;
        }
    }

    public getProfileFirstLetters(profile: Profile) {
        return profile.name
            .split(" ")
            .slice(0,2)
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
            throw new Error(`Profile with path "${path}" is not cached`);
        }

        return Observable.of(profile).delay(1); // delay kostil' for angular resolver...
    }

    public saveToCache(profile: Profile, path: string): void
    {
        this.profiles.push(profile);

        let profileStateKey: StateKey<Profile> = makeStateKey<Profile>("profile-" + path);
        this.transferState.set(profileStateKey, profile as Profile)
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