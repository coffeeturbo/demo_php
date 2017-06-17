import {Gender} from "./Gender";

export interface Profile {
    id: number;
    account_id: number;
    alias: string;
    birth_date: string;
    created: string;
    gender: Gender;
    name: string;
    verified: boolean;
}