import {Dictionaries} from "@angular-addons/translate";
import {LocaleRU} from "./RU";
import {AuthLocaleRU} from "../modules/Auth/Dictionaries/AuthLocaleRU";
import {SettingsLocaleRU} from "../modules/Settings/Dictionaries/SettingsLocaleRU";
import {ProfileLocaleRU} from "../modules/Profile/Dictionaries/ProfileLocaleRU";
import {PostLocaleRU} from "../modules/Post/Dictionaries/PostLocaleRU";
import {FeedLocaleRU} from "../modules/Feed/Dictionaries/FeedLocaleRU";
import {CommentLocaleRU} from "../modules/Comment/Dictionaries/CommentLocaleRU";
import {AttachmentLocaleRU} from "../modules/Attachment/Dictionaries/AttachmentLocaleRU";
import {NoticeLocaleRU} from "../modules/Notice/Dictionaries/NoticeLocaleRU";

export const dictionaries: Dictionaries = {
    "RU": [
        LocaleRU,
        AuthLocaleRU,
        AttachmentLocaleRU,
        CommentLocaleRU,
        FeedLocaleRU,
        NoticeLocaleRU,
        ProfileLocaleRU,
        PostLocaleRU,
        SettingsLocaleRU
    ],
    "EN": [{
        "days1":    "days",
        "months1":  "months",
        "years1":   "years",
        "comments1":   "comments",
    }]
};