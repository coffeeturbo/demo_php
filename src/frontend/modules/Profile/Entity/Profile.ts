import DateTimeFormat = Intl.DateTimeFormat;
import {Gender} from "./Gender";

export interface Profile {
    account:    Account;
    alias:      string;
    birth_date: string;
    created:    string;
    gender:     Gender;
    first_name: string;
    last_name:  string;
    nick_name:  string;
    patronymic: string;
    verified:   boolean;
}