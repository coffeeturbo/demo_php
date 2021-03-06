import {Gender} from "./Gender";

export interface Profile {
    id: number;
    account_id: number;
    alias: string;
    birth_date: string | null;
    created: string;
    gender: Gender;
    name: string;
    rating: number;
    verified: boolean;
    avatar: ProfileAvatar;
    backdrop: Image;
    subscribe: {
        status: boolean;
        subscribers_total: number;
    }
}

type ProfileAvatar = {
    medium: Image,
    small: Image,
    cropped: Image,
    origin: Image
};

export type ProfileAvatarSizes = "small" | "medium" | "cropped" | "origin"; 

interface Image {
    public_path: string;
    storage_path: string;
    name: string;
}