export interface AssetHistory {

    id: bigint;
    assetId: string;
    employeeId: string;
    action: string;
    note: string;
    actionDate?: Date;

}
