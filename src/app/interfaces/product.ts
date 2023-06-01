export interface Product {
    pId: number;
    products: Array<{
        name: string;
        description: string;
        category: string;
        price: number;
        sku: string;
        isStock: boolean;
        availableFor: {
            men: boolean;
            women: boolean;
        };
    }>

}