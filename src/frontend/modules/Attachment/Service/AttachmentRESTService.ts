import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";
import {Observable} from "rxjs";

import {AttachmentGetVideoLinkRequest} from "../Http/Request/AttachmentGetVideoLinkRequest";
import {AttachmentGetVideoLinkResponse} from "../Http/Response/AttachmentGetVideoLinkResponse";

@Injectable()
export class AttachmentRESTService {
    
    constructor(private rest: RESTService) {}
    
    public parseVideoLink(getVideoLinkRequest: AttachmentGetVideoLinkRequest) : Observable<AttachmentGetVideoLinkResponse>
    {
        let url = `/attachment/link`;
        
        return this.rest
            .put(url, JSON.stringify(getVideoLinkRequest))
            .map(res => res.json())
    }
}