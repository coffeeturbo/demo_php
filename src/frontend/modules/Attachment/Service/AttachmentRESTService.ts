import {Injectable} from "@angular/core";
import {RESTService} from "@angular-addons/rest";
import {Observable} from "rxjs";

import {AttachmentGetVideoLinkRequest} from "../Http/Request/AttachmentGetVideoLinkRequest";
import {AttachmentImageUploadRequest} from "../Http/Request/AttachmentImageUploadRequest";
import {Attachment} from "../Entity/Attachment";
import {AttachmentImage} from "../Entity/AttachmentImage";
import {AttachmentVideo} from "../Entity/AttachmentVideo";

@Injectable()
export class AttachmentRESTService {
    
    constructor(private rest: RESTService) {}
    
    public parseVideoLink(getVideoLinkRequest: AttachmentGetVideoLinkRequest) : Observable<Attachment<AttachmentVideo>>
    {
        let url = `/attachment/link`;
        
        return this.rest
            .put(url, JSON.stringify(getVideoLinkRequest))
            .map(res => res.json())
    }
    
    public uploadImage(attachmentImageUploadRequest: AttachmentImageUploadRequest): Observable<Attachment<AttachmentImage>>
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