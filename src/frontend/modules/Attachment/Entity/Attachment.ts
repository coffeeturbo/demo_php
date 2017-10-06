export interface Attachment {
    id: number;
    type: AttachmentType;
    content: any;
}

export enum AttachmentType
{
    text  = <any>"attachment-text",
    video  = <any>"attachment-video",
    image = <any>"attachment-image"
}