import {Dictionaries, DictionariesNavigatorAliases} from "../modules/Common/Translation/Entity/Definitions";

export const dictionaries: Dictionaries = {
    "RU": Object.assign(
        require('./RU.json'),
        require('../modules/Auth/Dictionaries/RU.json'),
        require('../modules/Settings/Dictionaries/RU.json')
    ),
    "EN": {}
};

export const dictionariesNavigatorAliases: DictionariesNavigatorAliases = {
    'RU': [
        'ru', 'ru-RU',  // Russian 
        'be', 'be-BE',  // Belarusian
        'uk', 'uk-UA'   // Ukraine
    ],
    'EN': ['en', 'en-US']
};