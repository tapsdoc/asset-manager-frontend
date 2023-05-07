import { Asset } from "./asset.model";
import { Employee } from "./employee.model";
import { User } from "./user.model";

export interface AssetHistory {

    id: bigint;
    asset: Asset;
    user: User;
    action: string;
    note: string;
    isAssigned: boolean;
    isDamaged: boolean;
    isReturned: boolean;
    actionDate?: Date;
}
