export const Config = {
    "product_name": "Socilite",
    "short_product_name": "SoL",
    "locale": "EN",
    "uri": {
        "websocket": "/ws",
        "api": "/api"
    },
    "account": {
        "constraints": {
            "username": {
                "min_length": 4
            },
            "password": {
                "match": "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[\\S]{8,}$",
                "invalid_message": "The password must contain at least 8 characters, including numbers, upper and lower case letters"
            }
        }
    }
};