import {Attachment} from "../../Entity/Attachment";
import {AttachmentImage} from "../../Entity/AttachmentImage";

export interface AttachmentImageUploadResponse extends Attachment {
    content: AttachmentImage
}

