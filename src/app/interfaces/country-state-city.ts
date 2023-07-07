export interface Country {
    id: string;
    name: string;
}

export interface State {
    id: string;
    name: string;
    countryId: string;
}

export interface City {
    id: string;
    name: string;
    stateId: string;
}