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
    avatar: ProfileAvatar;
}

type ProfileAvatar = {
    medium: Image,
    small: Image,
    cropped: Image,
    origin: Image
} | {};

interface Image {
    public_path: string;
    storage_path: string;
}