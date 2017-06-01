import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Profile} from "../Entity/Profile";
import {ProfileRESTService} from "./ProfileRESTService";
import {ResponseFailure} from "../../Application/Http/ResponseFailure";
import {ProfileGetResponse} from "../Http/Response/ProfileGetResponse";

@Injectable()
export class ProfileResolver implements Resolve<Profile> {
    private profiles: Profile[] = [];
    constructor(private rest: ProfileRESTService) {}
    
    resolve(route: ActivatedRouteSnapshot): Observable<Profile | ResponseFailure> 
    {
        try {
            return this.getFromCache(route.params.id);
        } catch(e) {
            return this.rest.get(route.params.id).map((profileGetResponse: ProfileGetResponse) => {
                this.profiles.push(profileGetResponse.entity);
                return profileGetResponse.entity
            });
        }
    }
    
    private getFromCache(profileId: number) {
        let profile: Profile = this.profiles.filter((profile)=>profile.id == profileId).shift();
        if(!profile) {
            throw new Error(`Profile with id ${profileId} is not cached`);
        }
        return Observable.of(profile);
    }
}