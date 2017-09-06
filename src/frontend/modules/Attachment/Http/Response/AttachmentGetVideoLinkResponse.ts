import {AttachmentType} from "../../Entity/Attachment";

export interface AttachmentGetVideoLinkResponse {
    id?: number,
    type: AttachmentType,
    content: {
        "youtubeId": string,
        "url": string,
        "image": string,
        "duration": number,
        "title": string,
        "description": string
    }
}