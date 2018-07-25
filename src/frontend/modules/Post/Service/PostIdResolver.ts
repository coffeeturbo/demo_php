import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {InfoPostRESTService} from "./InfoPostRESTService";

@Injectable()
export class PostIdResolver implements Resolve<number>{

    constructor(private infoPostRESTService: InfoPostRESTService){}
    
    resolve(route: ActivatedRouteSnapshot): Observable<number> {
        if(route.params["path"]) {
            return Observable.of(route.params["path"].replace(/^.*?(\d+)$/g, '$1'));
        } else if(route.data["postAlias"]) {
            return this.infoPostRESTService.getInfoPostId(route.data["postAlias"]);
        } else {
            return Observable.throw("Missing param `path` in route or `postAlias` in data");
        }
    }
}