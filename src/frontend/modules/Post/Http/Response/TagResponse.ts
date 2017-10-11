import {Tag} from "../../Entity/Tag";

export interface TagResponse {
    total: number,
    entities: {
        entity: Tag
    }[]
}