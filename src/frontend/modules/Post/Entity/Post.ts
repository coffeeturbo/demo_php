import {Tag} from "../../Tag/Entity/Tag";
import {Attachment} from "../../Attachment/Entity/Attachment";
import {Profile} from "../../Profile/Entity/Profile";
import {Vote} from "../../Vote/Entity/Vote";
import {AttachmentImage} from "../../Attachment/Entity/AttachmentImage";
import {AttachmentText} from "../../Attachment/Entity/AttachmentText";
import {AttachmentVideo} from "../../Attachment/Entity/AttachmentVideo";

export interface Post {
    id?: number;
    title: string;
    created: string;
    updated: string;
    tags: Tag[];
    attachments: Attachment<AttachmentImage | AttachmentText | AttachmentVideo>[];
    profile: Profile;
    votes: Vote;
    comments_total: number;
    favorite?: boolean;
}