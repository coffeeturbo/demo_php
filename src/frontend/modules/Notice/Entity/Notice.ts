import {NoticeType} from "./NoticeType";

export interface Notice {
    id: number;
    message: string;
    type: NoticeType;
    created: Date;
    readed?: boolean;
    icon?: string;
}