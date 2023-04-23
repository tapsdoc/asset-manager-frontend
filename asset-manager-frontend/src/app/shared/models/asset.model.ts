export interface Asset {

    assetId: string;
    name: string;
    assetModelNumber: string;
    serialNumber: string;
    description: string;
    image: string;
    price: number;
    dateOfPurchase: Date;
    dateOfAssignment: Date;
    dateOfManufacture: Date;
    assetStatus: string;
    supplier: bigint;
    category: bigint;
}

