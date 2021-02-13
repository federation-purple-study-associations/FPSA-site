/**
 * FPSA API
 * FPSA API documentation
 *
 * The version of the OpenAPI document: 1.4.1
 * Contact: info@fpsa.nl
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface User { 
    id: number;
    email: string;
    fullName: string;
    academy: string;
    establishment: string;
    kvk: number;
    boardTransfer: string;
    websiteUrl: string;
    lastLogin?: string;
    memberSince?: string;
    recieveEmailUpdatesEvents: boolean;
    roleId: number;
}
