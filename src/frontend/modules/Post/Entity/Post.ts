import {Tag} from "./Tag";
import {Attachment} from "../../Attachment/Entity/Attachment";

export interface Post {
    id?: number
    title: string,
    tags: Tag[]
    attachments: Attachment[]
}