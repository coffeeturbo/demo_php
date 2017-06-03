import {Injectable} from '@angular/core';
import {Profile} from "../Entity/Profile";
import {ProfileRESTService} from "./ProfileRESTService";
import {Observable} from "rxjs";
import {ProfileGetResponse} from "../Http/Response/ProfileGetResponse";

@Injectable()
export class ProfileService {
    private profiles: Profile[] = [];

    constructor(private rest: ProfileRESTService) {
    }

    public get(path: string): Observable<Profile> 
    {
        try {
            return this.getFromCache(path);
        } catch (e) {
            let profileGetResponse: Observable<ProfileGetResponse>;

            switch (this.getPathType(path)) {
                case "id":
                    profileGetResponse = this.rest.getById(+path);
                    break;
                case "alias":
                    profileGetResponse = this.rest.getByAlias(path);
                    break;
                default:
                    throw new Error(`Invalid call. Alias or id must be defined`);
            }

            return profileGetResponse.map((profileGetResponse: ProfileGetResponse) => {
                this.saveToCache(profileGetResponse.entity);
                return profileGetResponse.entity;
            });
        }

    }

    private getFromCache(path: number | string): Observable<Profile> 
    {
        let profile: Profile = this.profiles.filter((profile) => profile.id == path || profile.alias == path).shift();
        if (!profile) {
            throw new Error(`Profile with path "${path}" is not cached`);
        }

        return Observable.of(profile);
    }

    public saveToCache(profile: Profile) 
    {
        this.profiles.push(profile);
    }

    public replaceInCache(oldProfile: Profile, newProfile: Profile) 
    {
        let index: number = this.profiles.indexOf(oldProfile);
        if(index != -1) {
            this.profiles[this.profiles.indexOf(oldProfile)] = newProfile;
        } else throw new Error(`${index} not found in cache file`);
    }


    private getPathType(path): PathType 
    {
        return !isNaN(parseFloat(path)) && isFinite(path) ? 'id' : 'alias';
    }
}


type PathType = "id" | "alias";