export interface userObj {
    id?: number;
    name?: string;
    email?: string;
    type?: string;
    pass?: string;
    mob?: number;
    addresses: Array<{ add: string }>;
}