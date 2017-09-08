export interface Attachment {
    id: number;
    type: AttachmentType;
    content: any;
}

export enum AttachmentType
{
    text  = <any>"text",
    video  = <any>"video",
    image = <any>"image",
}