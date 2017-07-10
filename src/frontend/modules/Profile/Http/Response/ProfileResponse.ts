import {Response} from "../../../Application/Http/Response";
import {Profile} from "../../Entity/Profile";

export interface ProfileResponse extends Response {
    entity: Profile
}