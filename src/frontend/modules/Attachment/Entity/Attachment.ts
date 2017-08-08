export interface Attachment {
    id: number;
    type: AttachmentType;
    value: any;
}

export enum AttachmentType
{
    text  = <any>"text",
    video  = <any>"video",
    image = <any>"image",
}