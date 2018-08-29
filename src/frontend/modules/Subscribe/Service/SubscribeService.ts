import {Injectable} from "@angular/core";
import {Response} from "../../Application/Http/Response";
import {Observable} from "../../../node_modules/rxjs";
import {SubscribeRESTService} from "./SubscribeRESTService";
import {Profile} from "../../Profile/Entity/Profile";

@Injectable()
export class SubscribeService {
    
    public subscribeProfileList: Profile[];
    
    constructor(private rest: SubscribeRESTService) {}

    public subscribe(profile: Profile): Observable<Response>
    {
        this.subscribeProfileList.unshift(profile);
        return this.rest.subscribe(profile.id);
    }

    public unsubscribe(profile: Profile): Observable<Response>
    {
        let index = this.subscribeProfileList.findIndex(profile => profile == profile);
        this.subscribeProfileList.splice(index,1);
        return this.rest.unsubscribe(profile.id);
    }
    
    public getProfileList(): Observable<Profile[]>
    {
        return this.rest.getProfileList()
            .do(subscribeProfileList => this.subscribeProfileList = subscribeProfileList)
        ;
    }
}