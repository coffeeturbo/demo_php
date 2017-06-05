import {EventEmitter, Injectable} from "@angular/core";

import {Profile} from "../Entity/Profile";
import {ProfileRESTService} from "./ProfileRESTService";
import {Observable} from "rxjs/Observable";
import {ProfileGetResponse} from "../Http/Response/ProfileGetResponse";

@Injectable()
export class ProfileService {
    private profiles: Profile[] = [];
    public onProfileResolve = new EventEmitter<Profile>(true);

    constructor(private rest: ProfileRESTService) {}

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

    /**
     * @TODO: Implement method
     *
     */
    getOwn(): Observable<Profile>
    {
        return this.get("killers");
    }

    private getFromCache(path: number | string): Observable<Profile> {
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
        return !isNaN(parseFloat(path)) ? "id" : "alias";
    }
}


type PathType = "id" | "alias";