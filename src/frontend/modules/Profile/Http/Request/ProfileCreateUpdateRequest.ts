import {Gender} from "../../Entity/Gender";

export interface ProfileCreateUpdateRequest {
    alias: string;
    birth_date: string;
    gender: Gender;
    first_name: string;
    last_name: string;
    nickname: string;
    patronymic: string;
}