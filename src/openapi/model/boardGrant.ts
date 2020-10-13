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
import { User } from './user';


export interface BoardGrant { 
    id: number;
    delivered: string;
    checked: boolean;
    checkedAt: string;
    user: User;
}