/**
 * FPSA API
 * FPSA API documentation
 *
 * The version of the OpenAPI document: 1.3.0
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
    lastLogin?: string;
    recieveEmailUpdatesEvents: boolean;
    roleId: number;
}
