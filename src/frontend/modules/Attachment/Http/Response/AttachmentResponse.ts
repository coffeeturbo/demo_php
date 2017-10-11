import {Attachment} from "../../Entity/Attachment";

export interface AttachmentResponse {
    total: number;
    entities: {
        entity: Attachment
    }[]
}