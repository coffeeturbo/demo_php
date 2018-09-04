import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {Observable} from "rxjs";
import {InfoPostRESTService} from "./InfoPostRESTService";

@Injectable()
export class PostIdResolver implements Resolve<number>{

    public onResolve: Observable<number>;

    constructor(private infoPostRESTService: InfoPostRESTService){}
    
    resolve(route: ActivatedRouteSnapshot): Observable<number> {
        if(route.params["path"]) {
            this.onResolve = Observable.of(route.params["path"].replace(/^.*?(\d+)$/g, '$1'));
        } else if(route.data["postAlias"]) {
            this.onResolve = this.infoPostRESTService.getInfoPostId(route.data["postAlias"])
                .publishReplay(1)
                .refCount();
        } else {
            this.onResolve = Observable.throw("Missing param `path` in route or `postAlias` in data");
        }
        
        return this.onResolve;
    }
}