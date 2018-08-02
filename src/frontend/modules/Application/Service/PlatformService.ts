import {Inject, Optional, PLATFORM_ID} from "@angular/core";
import {Injectable} from "@angular/core";
import {isPlatformBrowser, isPlatformServer} from '@angular/common';
import {RESPONSE} from "@nguniversal/express-engine/tokens";
import {Response} from "express";
import {HttpCodes} from "../Entity/HttpCodes";

@Injectable()
export class PlatformService {

    constructor(
        @Inject(PLATFORM_ID) public platformId: Object,
        @Optional() @Inject(RESPONSE) private res: Response
    ){}

    public isPlatformBrowser() {
        return isPlatformBrowser(this.platformId)
    }
    
    public isPlatformServer() {
        return isPlatformServer(this.platformId)
    }
    
    public setPageStatus(httpCode: HttpCodes) {
        if (this.isPlatformServer()) {
            this.res.status(httpCode);
        }
    }
}