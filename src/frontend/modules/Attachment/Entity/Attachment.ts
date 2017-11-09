export interface Attachment<AttachmentContent> {
    id: number;
    type: AttachmentType;
    content: AttachmentContent;
}

export enum AttachmentType
{
    text = <any>"attachment-text",
    video = <any>"attachment-video",
    image = <any>"attachment-image"
}