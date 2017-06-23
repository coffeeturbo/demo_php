import {Response} from "../../../Application/Http/Response";
import {Profile} from "../../Entity/Profile";

// TODO: Переименовать в ProfileResponse если не появится других Response
export interface ProfileGetResponse extends Response {
    entity: Profile
}