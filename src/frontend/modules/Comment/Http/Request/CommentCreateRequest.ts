export interface CommentCreateRequest {
    post_id: number;
    parent_id?: number;
    // Blyadskii nelmio api doc, so can't typizing fields... 
    // tags: Tag[];
    // attachments: Attachment<AttachmentImage | AttachmentText | AttachmentVideo>[];
    attachments: string;
}