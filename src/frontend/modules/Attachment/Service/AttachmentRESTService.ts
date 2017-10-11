import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";
import {Observable} from "rxjs";

import {AttachmentGetVideoLinkRequest} from "../Http/Request/AttachmentGetVideoLinkRequest";
import {AttachmentGetVideoLinkResponse} from "../Http/Response/AttachmentGetVideoLinkResponse";
import {AttachmentImageUploadRequest} from "../Http/Request/AttachmentImageUploadRequest";
import {AttachmentImageUploadResponse} from "../Http/Response/AttachmentImageUploadResponse";

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
    
    public uploadImage(attachmentImageUploadRequest: AttachmentImageUploadRequest): Observable<AttachmentImageUploadResponse>
    {
        let url = `/protected/attachment/upload/image`;
        let formData = new FormData();

        for (let field in attachmentImageUploadRequest) {
            formData.append(field, attachmentImageUploadRequest[field]);
        }

        return this.rest.auth()
            .post(url, formData)
            .map(res => res.json())
        ;
    }
}