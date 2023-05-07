import { User } from "./user.model";
import { Department } from "./department.model";

export interface Employee {

    user: User
    firstName: string;
    lastName: string;
    department: Department;
    designation: string;
    phoneNumber: string;
    address: string;
    profileImage: string;
}
