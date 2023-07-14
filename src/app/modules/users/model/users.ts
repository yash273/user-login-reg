export interface Users {
    id: number,
    username: string,
    firstName: string,
    lastName?: string,
    email: string,
    phone: string,
    address: {
        street?: string,
        city?: string,
        state?: string,
        postalCode?: string,
        country: string
    }
}
