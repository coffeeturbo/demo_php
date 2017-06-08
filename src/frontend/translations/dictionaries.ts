import {Dictionaries} from "@angular-addons/translate";

export const dictionaries: Dictionaries = {
    "RU": Object.assign(
        require('./RU.json'),
        require('../modules/Auth/Dictionaries/RU.json'),
        require('../modules/Settings/Dictionaries/RU.json')
    ),
    "EN": {}
};