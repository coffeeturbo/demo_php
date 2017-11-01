import {Tag} from "./Tag";
import {Attachment} from "../../Attachment/Entity/Attachment";
import {Profile} from "../../Profile/Entity/Profile";
import {Vote} from "../../Vote/Entity/Vote";

export interface Post {
    id?: number;
    title: string;
    created: string;
    updated: string;
    tags: Tag[];
    attachments: Attachment[];
    profile: Profile;
    votes: Vote
}