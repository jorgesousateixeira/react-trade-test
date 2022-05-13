import {Role} from "./role";

export interface User {
    FederatedIdentityList: string[];
    ID: string;
    IsSystemIntegrationUser: boolean,
    LastDateTimeForFailedAttempt: Date;
    LastDatetimeLogin: string;
    LastPassword: string;
    LastPasswordChange: Date;
    NTries: number;
    Name: string;
    NetworkMask: string;
    NextPasswordChange: Date;
    OnlyIdentityProviderAuth: boolean;
    PartnerId: string;
    Password: string;
    PasswordHashType: string;
    Permissions: number[];
    Roles: Role[];
    Status: string;
    Timezone: string;
}
