import {Gender} from "../../Profile/Entity/Gender";
import {Profile} from "../../Profile/Entity/Profile";
import {AttachmentType} from "../../Attachment/Entity/Attachment";
import {Comment} from "../Entity/Comment";

export class MockData {
    public  static fakeProfile: Profile = {
        id: 1,
        account_id: 5,
        gender: Gender.Male,
        name: "\u0411\u0430\u0439\u0434\u0438\u043d \u0410\u0440\u0442\u0451\u043c",
        alias: "killers",
        avatar: {
            "origin": {
                "public_path": "uploads\/avatar\/origin\/origin_5a1d46c8e7a72.jpg",
                "storage_path": "\/opt\/jet\/backend\/app\/..\/..\/web\/uploads\/avatar\/origin\/origin_5a1d46c8e7a72.jpg",
            },
            "cropped": {
                "public_path": "uploads\/avatar\/cropped\/cropped_5a1d46c9294e0.jpg",
                "storage_path": "\/opt\/jet\/backend\/app\/..\/..\/web\/uploads\/avatar\/cropped\/cropped_5a1d46c9294e0.jpg",
            },
            "medium": {
                "public_path": "uploads\/avatar\/medium\/medium_5a1d46c972d06.jpg",
                "storage_path": "\/opt\/jet\/backend\/app\/..\/..\/web\/uploads\/avatar\/medium\/medium_5a1d46c972d06.jpg",
            },
            "small": {
                "public_path": "uploads\/avatar\/small\/small_5a1d46c993d21.jpg",
                "storage_path": "\/opt\/jet\/backend\/app\/..\/..\/web\/uploads\/avatar\/small\/small_5a1d46c993d21.jpg",
            }
        },
        backdrop: {
            "public_path": "bundles\/profile\/backdrop\/presets\/5.jpg",
            "storage_path": "\/opt\/jet\/backend\/app\/..\/..\/web\/bundles\/profile\/backdrop\/presets\/5.jpg",
        },
        birth_date: "1997-03-01",
        verified: false,
        created: "2017-07-05T09:09:41+00:00",
        rating: 26
    };

    public static comment1: Comment = {
        parent_id: null,
        post_id: 1,
        created: "2017-11-10T13:12:32+00:00",
        updated: "2017-11-10T13:12:32+00:00",
        attachments: [
            {id: 60, type: AttachmentType.text, content: {text: "Хех.. ничего не меняется. Я выпускался в 99м году.\r\nВремена тогда, конечно, были тяжелые.\r\nНо \"родительский комитет\" в конце концов потерял берега, что не удивительно.\r\nИм рулили две активные мамаши, дочери которых шли на медали.\r\nТак знатно вылизывали... ой-ой, ладно бы за свой счет исключительно."}}
        ],
        profile: MockData.fakeProfile,
        votes: {state: "positive", rating: 67, positive: 1, negative: 1}
    };
    
    public static comment2: Comment = {
        parent_id: null,
        post_id: 1,
        created: "2017-11-10T13:12:32+00:00",
        updated: "2017-11-10T13:12:32+00:00",
        attachments: [
            {id: 60, type: AttachmentType.text, content: {text: "Хех.. ничего не меняется. Я выпускался в 99м году.\r\nВремена тогда, конечно, были тяжелые.\r\nНо \"родительский комитет\" в конце концов потерял берега, что не удивительно.\r\nИм рулили две активные мамаши, дочери которых шли на медали.\r\nТак знатно вылизывали... ой-ой, ладно бы за свой счет исключительно."}}
        ],
        comments: [
            MockData.comment1
        ],
        profile: MockData.fakeProfile,
        votes: {state: "positive", rating: 102, positive: 1, negative: 1}
    };
    
    public static comment: Comment = {
        parent_id: null,
        post_id: 1,
        created: "2017-11-10T13:12:32+00:00",
        updated: "2017-11-10T13:12:32+00:00",
        attachments: [
            {id: 60, type: AttachmentType.text, content: {text: "33 года, аналогично с ростом, и надежды вырасти уже нет."}}
        ],
        profile: MockData.fakeProfile,
        votes: {state: "positive", rating: -40, positive: 1, negative: 1},
        comments: [
            MockData.comment1,
            MockData.comment1,
            MockData.comment2,
        ]
    }
    
}