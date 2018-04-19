import {PostCreateRequest} from "./PostCreateRequest";

export interface PostUpdateRequest extends PostCreateRequest {
    id: number;
}