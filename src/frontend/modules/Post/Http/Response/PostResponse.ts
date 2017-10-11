import {AttachmentResponse} from "../../../Attachment/Http/Response/AttachmentResponse";
import {Profile} from "../../../Profile/Entity/Profile";
import {TagResponse} from "./TagResponse";

export interface PostResponse {
    entity: {
        id?: number;
        title: string;
        created: string;
        updated: string;
        tags: TagResponse;
        attachments: AttachmentResponse;
        profile: Profile;
    }
}