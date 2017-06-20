import {Gender} from "../../Entity/Gender";

export interface ProfileCreateUpdateRequest {
    alias?: string;
    birth_date?: string;
    gender?: Gender;
    name?: string;
}