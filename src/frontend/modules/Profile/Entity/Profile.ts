import DateTimeFormat = Intl.DateTimeFormat;
import {Gender} from "./Gender";

export interface Profile {
    id:         number;
    account:    Account;
    alias:      string;
    birth_date: string;
    created:    string;
    gender:     Gender;
    first_name: string;
    last_name:  string;
    nickname:  string;
    patronymic: string;
    verified:   boolean;
}