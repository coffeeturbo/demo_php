import {Attachment} from "../../Attachment/Entity/Attachment";
import {Profile} from "../../Profile/Entity/Profile";
import {Vote} from "../../Vote/Entity/Vote";
import {AttachmentImage} from "../../Attachment/Entity/AttachmentImage";
import {AttachmentText} from "../../Attachment/Entity/AttachmentText";
import {AttachmentVideo} from "../../Attachment/Entity/AttachmentVideo";

export interface Comment {
    id: number;
    parent_id: number | null;
    post_id: number;
    created: string;
    updated: string;
    attachments: Attachment<AttachmentImage | AttachmentText | AttachmentVideo>[];
    profile: Profile;
    votes: Vote;
    comments?: Comment[];
    comments_total: number;
}