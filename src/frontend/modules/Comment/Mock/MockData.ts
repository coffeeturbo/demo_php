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
    public  static fakeProfile2: Profile = {
        "id": 54,
        "account_id": 95,
        "gender": Gender.Male,
        "name": "Aslan",
        "alias": null,
        "avatar": {
            "origin": {
                "public_path": "uploads\/avatar\/origin\/origin_5a0d739e0fb0d.jpg",
                "storage_path": "\/opt\/jet\/backend\/app\/..\/..\/web\/uploads\/avatar\/origin\/origin_5a0d739e0fb0d.jpg",
            },
            "cropped": {
                "public_path": "uploads\/avatar\/cropped\/cropped_5a0d739e20e88.jpg",
                "storage_path": "\/opt\/jet\/backend\/app\/..\/..\/web\/uploads\/avatar\/cropped\/cropped_5a0d739e20e88.jpg",
            },
            "medium": {
                "public_path": "uploads\/avatar\/medium\/medium_5a0d739e3aa00.jpg",
                "storage_path": "\/opt\/jet\/backend\/app\/..\/..\/web\/uploads\/avatar\/medium\/medium_5a0d739e3aa00.jpg",
            },
            "small": {
                "public_path": "uploads\/avatar\/small\/small_5a0d739e489bc.jpg",
                "storage_path": "\/opt\/jet\/backend\/app\/..\/..\/web\/uploads\/avatar\/small\/small_5a0d739e489bc.jpg",
            }
        },
        "backdrop": {
            "public_path": "bundles\/profile\/backdrop\/presets\/4.jpg",
            "storage_path": "\/opt\/jet\/backend\/app\/..\/..\/web\/bundles\/profile\/backdrop\/presets\/4.jpg"
        },
        "birth_date": "1980-11-16",
        "verified": false,
        "created": "2017-11-16T11:15:53+00:00",
        "rating": 4
    };

    public static comment1: Comment = {
        id: 11,
        parent_id: null,
        post_id: 1,
        created: "2017-11-10T13:12:32+00:00",
        updated: "2017-11-10T13:12:32+00:00",
        attachments: [
            {id: 60, type: AttachmentType.text, content: {text: "Нормальные уборщицы получают побольше половины офисных работников."}}
        ],
        comments: [
            {
                id:41,
                parent_id: null,
                post_id: 1,
                created: "2017-11-10T13:12:32+00:00",
                updated: "2017-11-10T13:12:32+00:00",
                attachments: [
                    {
                        id: 60,
                        type: AttachmentType.text,
                        content: {text: "Где-то на дальней полке зарыдал мой диплом о высшем техническом."}
                    }
                ],
                profile: MockData.fakeProfile2,
                votes: {state: "none", rating: 59, positive: 63, negative: 4}
            }
        ],        
        profile: MockData.fakeProfile,
        votes: {state: "positive", rating: 67, positive: 72, negative: 5}
    };
    
    public static comment2: Comment = {
        id: 31,
        parent_id: null,
        post_id: 1,
        created: "2017-11-10T13:12:32+00:00",
        updated: "2017-11-10T13:12:32+00:00",
        attachments: [
            {
                id: 60,
                type: AttachmentType.text,
                content: {text: "35 тысяч за уборку 200 метров или это со всех офисов? Я готов за 25 у вас убирать если так."}
            }
        ],

        profile: MockData.fakeProfile2,
        votes: {state: "none", rating: 59, positive: 63, negative: 4}
    };
    
    public static comment3: Comment = {
        id: 12,
        parent_id: null,
        post_id: 1,
        created: "2017-11-10T13:12:32+00:00",
        updated: "2017-11-10T13:12:32+00:00",
        attachments: [
            {
                id: 60,
                type: AttachmentType.text,
                content: {text: "У нас в дачном посёлке живёт узбек Тимур с женой.\nСадовничает. С кем как отношения: кто-то платит в месяц 1000 рублей за сотку и он ухаживает за участком, кто-то сдельно за подготовку участка к приезду. Можно у его жены заказать уборку дома, как оказалось у них есть ключи от многих домов. Кто-то заказывает даже плов к приезду\nПрошлым летом узнал, что он обслуживает примерно 30 участков по 6-10 соток."}
            }
        ],
        profile: MockData.fakeProfile,
        votes: {state: "none", rating: 59, positive: 63, negative: 4}
    };
    
    public static comment: Comment = {
        id: 13,
        parent_id: null,
        post_id: 1,
        created: "2017-11-10T13:12:32+00:00",
        updated: "2017-11-10T13:12:32+00:00",
        attachments: [
            {
                id: 60,
                type: AttachmentType.text,
                content: {text: "О, есть история про уборщиц)\nРаботал когда-то админом, в одном из офисов бц,\nПриходила приятная женщина из средней Азии, офис небольшой, метров 200+-, убиралась и уходила.\nПотом как то разговорились, в бц не было своей клининговой компании, она устроилась в одно место, потом походила по офисам, предлагала свои услуги)\nНабралось 20+ офисов, не знаю как у других, мы платили 35+ к)\nРаботала одна, почти сутками) но сколько она за это получала)"}
            }
        ],
        profile: MockData.fakeProfile,
        votes: {state: "negative", rating: -40, positive: 1, negative: 41},
        comments: [
            MockData.comment1,
            MockData.comment2,
            MockData.comment3,
        ]
    }
    
}