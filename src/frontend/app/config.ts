import {DictionariesNavigatorAliases} from "@angular-addons/translate";
import {CounterConfig} from "ng-yandex-metrika";

/* 
if(!process.env.dotenv) {
    throw new Error("process.env.dotenv is not defined. It looks like .env does not exist. Use .env.dist to make .env file in project sourse.");
}
*/

export const Config: ConfigInterface = {
    "product_name": "Topicoff",
    "locale": {
        "default": "RU",
        "aliases": {
            'RU': [
                'ru', 'ru-RU',  // Russian 
                'be', 'be-BE',  // Belarusian
                'uk', 'uk-UA'   // Ukraine
            ],
            'EN': ['en', 'en-US']
        }
    },
    "uri": {
        "websocket": "/ws",
        "api": (process.env.HOST || "") + (process.env.ENV === "development" ? "/api/app_dev.php" : "/api")
    },
    "auth": {
        "token_key": "token",
        "refresh_token_key": "refresh_token",
        "messages": {
            "confirmed": "Your email confirmed. Now you can voting and much more!",
            "comfirming": "Please confirm your email at the <a href='/settings'>profile settings</a>.",
            "registered": "Thank you for register!"
        }
    },
    "applications" : {
        "metrika" : {
            "id": process.env.ENV === "development" ? 0 : 47936753,
            "webvisor": true
        },
        "facebook" : {
            "app_id" : 145634995501895 // ToDo: register app and insert code here!
        }
    },
    "account": {
        "constraints": {
            "username": {
                "min_length": 4
            },
            "password": {
                "match": '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[\\S]{8,}$',
                "invalid_message": "The password must contain at least 8 characters, including numbers, upper and lower case letters"
            },
        }
    },
    "profile": {
        "constraints": {
            "alias": {
                "min_length": 3,
                // @TODO: alias can't be int!!!
                "match": '^[a-zA-Z0-9\\._]+$'
            },
            "avatar": {
                "minWidth": 200,
                "minHeight": 200,
                "maxHeight": 7000,
                "maxWidth": 7000,
                "minAspectRatio": 0.25,
                "maxAspectRatio": 3
            },
            "backdrop": {
                "minWidth": 1500,
                "minHeight": 200,
                "maxHeight": 7000,
                "maxWidth": 7000,
            }
        }
    },
    "post": {
        "title" : {
            "constraints": {
                "min_length": 5,
                "max_length": 140,
            }
        },
        "tags" : {
            "constraints": {
                "min_length": 2,
                "max_length": 7,
            }
        }
    }
};

/** For AOT **/
interface ConfigInterface {
    product_name: string;
    locale: {
        default : string,
        aliases : DictionariesNavigatorAliases
    };
    uri: {
        websocket: string,
        api : string
    };
    auth: {
        token_key: string,
        refresh_token_key: string,
        messages: {
            confirmed: string,
            comfirming: string,
            registered: string
        }
    };
    account: {
        constraints: {
            username: {
                min_length: number
            },
            password: {
                match: string,
                invalid_message: string
            },
        }
    };
    applications : {
        metrika : CounterConfig,
        facebook : {
            app_id : number
        }
    };
    profile: {
        constraints: {
            alias: {
                min_length: number,
                match: string
            },
            avatar: {
                minWidth: number,
                minHeight: number,
                maxHeight: number,
                maxWidth: number,
                minAspectRatio: number,
                maxAspectRatio: number
            },
            backdrop: {
                minWidth: number,
                minHeight: number,
                maxHeight: number,
                maxWidth: number,
            }
        }
    },
    post: {
        title : {
            constraints: {
                min_length: number,
                max_length: number,
            }
        },
        tags : {
            constraints: {
                min_length: number,
                max_length: number,
            }
        }
    }
}