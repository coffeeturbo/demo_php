export type Locale = 
    "RU" | 
    "EN";

export type Dictionary = {
    [key: string]: any
}

export type Dictionaries = {
    [key in Locale]: Dictionary;
}