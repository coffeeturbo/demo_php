import {DictionariesNavigatorAliases} from "@angular-addons/translate";

export const Config: ConfigInterface = {
    "product_name": "Socilite",
    "short_product_name": "SoL",
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
        "api": (process.env.ENV === "development" ? "/api/app_dev.php" : "/api") // @TODO ВРЕМЕННО! убрал пока не работает Universal
    },
    "auth": {
        "token_key": "token",
        "refresh_token_key": "refresh_token"
    },
    "applications" : {
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
    short_product_name: string;
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
        refresh_token_key: string
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