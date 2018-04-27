import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

import {AttachmentGetVideoLinkRequest} from "../Http/Request/AttachmentGetVideoLinkRequest";
import {AttachmentImageUploadRequest} from "../Http/Request/AttachmentImageUploadRequest";
import {Attachment} from "../Entity/Attachment";
import {AttachmentImage} from "../Entity/AttachmentImage";
import {AttachmentVideo} from "../Entity/AttachmentVideo";
import {AttachmentRESTService} from "./AttachmentRESTService";

@Injectable()
export class AttachmentService
{
    constructor(private rest: AttachmentRESTService) {}
    
    public parseVideoLink(getVideoLinkRequest: AttachmentGetVideoLinkRequest) : Observable<Attachment<AttachmentVideo>>
    {
        if(!/https?:\/\/.*/.test(getVideoLinkRequest.url)) {
            return Observable.throw("Invalid link");
        }
        
        return this.rest.parseVideoLink(getVideoLinkRequest);
    }
    
    public uploadImage(attachmentImageUploadRequest: AttachmentImageUploadRequest): Observable<Attachment<AttachmentImage>>
    {
        return this.rest.uploadImage(attachmentImageUploadRequest);
    }
}