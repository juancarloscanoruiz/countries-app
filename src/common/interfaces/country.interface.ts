export interface Country {
    code: string;
    name: string;
    currency: string;
    continent: {
        name: string
    };
    languages: Language[]
    capital: string
}

export interface Language {
    name: string
}