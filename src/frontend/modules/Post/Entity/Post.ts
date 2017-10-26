import {Tag} from "./Tag";
import {Attachment} from "../../Attachment/Entity/Attachment";
import {Profile} from "../../Profile/Entity/Profile";

export interface Post {
    id?: number;
    title: string;
    created: string;
    updated: string;
    tags: Tag[];
    attachments: Attachment[];
    profile: Profile;
    votes: {
        negative : number;
        positive: number;
        rating: number;
        state: "none" | "positive" | "negative"
    }
}