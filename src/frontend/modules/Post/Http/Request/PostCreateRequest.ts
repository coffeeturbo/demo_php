import {Tag} from "../../../Tag/Entity/Tag";
import {Attachment} from "../../../Attachment/Entity/Attachment";
import {AttachmentImage} from "../../../Attachment/Entity/AttachmentImage";
import {AttachmentText} from "../../../Attachment/Entity/AttachmentText";
import {AttachmentVideo} from "../../../Attachment/Entity/AttachmentVideo";

export interface PostCreateRequest {
    title: string;
    tags: Tag[];
    attachments: Attachment<AttachmentImage | AttachmentText | AttachmentVideo>[];
}