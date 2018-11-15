export interface PostCreateRequest {
    title: string;
    // Blyadskii nelmio api doc, so can't typizing fields... 
    // tags: Tag[];
    // attachments: Attachment<AttachmentImage | AttachmentText | AttachmentVideo>[];
    // seo?: { title?: string, description?: string };
    tags: string;
    attachments: string;
    seo?: string;
}