import {Inject, PLATFORM_ID} from "@angular/core";
import {Injectable} from "@angular/core";
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class PlatformService {

    constructor(
        @Inject(PLATFORM_ID) public platformId: Object
    ){}

    public isPlatformBrowser() {
        return isPlatformBrowser(this.platformId)
    }
    
    public isPlatformServer() {
        return isPlatformBrowser(this.platformId)
    }
}