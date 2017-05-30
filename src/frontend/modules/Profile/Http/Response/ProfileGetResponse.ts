import {Response} from "../../../Application/Http/Response";
import {Profile} from "../../Entity/Profile";

export interface ProfileGetResponse extends Response {
    entity: Profile
}