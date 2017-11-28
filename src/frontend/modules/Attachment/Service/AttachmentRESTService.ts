import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

import {AttachmentGetVideoLinkRequest} from "../Http/Request/AttachmentGetVideoLinkRequest";
import {AttachmentImageUploadRequest} from "../Http/Request/AttachmentImageUploadRequest";
import {Attachment} from "../Entity/Attachment";
import {AttachmentImage} from "../Entity/AttachmentImage";
import {AttachmentVideo} from "../Entity/AttachmentVideo";

@Injectable()
export class AttachmentRESTService
{
    constructor(private http: HttpClient) {}
    
    public parseVideoLink(getVideoLinkRequest: AttachmentGetVideoLinkRequest) : Observable<Attachment<AttachmentVideo>>
    {
        let url = `/attachment/link`;
        
        return this.http
            .put<Attachment<AttachmentVideo>>(url, getVideoLinkRequest)
        ;    
    }
    
    public uploadImage(attachmentImageUploadRequest: AttachmentImageUploadRequest): Observable<Attachment<AttachmentImage>>
    {
        let url = `/protected/attachment/upload/image`;
        let formData = new FormData();

        for (let field in attachmentImageUploadRequest) {
            formData.append(field, attachmentImageUploadRequest[field]);
        }

        return this.http
            .post<Attachment<AttachmentImage>>(url, formData, {withCredentials: true})
        ;
    }
}