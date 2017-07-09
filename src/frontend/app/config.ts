export const Config = {
    "product_name": "Socilite",
    "short_product_name": "SoL",
    "locale": {
        "default": "EN",
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
        "api": process.env.ENV === "production" ?  "/api" : "/api/app_dev.php"
    },
    "auth" : {
        "token_key" : "token",
        "refresh_token_key" : "refresh_token"
    },
    "account": {
        "constraints": {
            "username": {
                "min_length": 4
            },
            "password": {
                "match": "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[\\S]{8,}$",
                "invalid_message": "The password must contain at least 8 characters, including numbers, upper and lower case letters"
            },
        }
    },
    "profile": {
        "constraints": {
            "avatar": {
                minWidth: 200,
                minHeight: 200,
                maxHeight: 7000,
                maxWidth: 7000,
                minAspectRatio: 0.25,
                maxAspectRatio: 3
            }
        }
    }
};