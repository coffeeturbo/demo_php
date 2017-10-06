import {Tag} from "./Tag";
import {Attachment} from "../../Attachment/Entity/Attachment";
import {Profile} from "../../Profile/Entity/Profile";

export interface Post {
    id?: number;
    title: string;
    tags: Tag[];
    attachments: Attachment[];
    created: string;
    updated: string;
    profile: Profile;
}