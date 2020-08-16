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
import { IncomeStatement } from './incomeStatement';
import { PaymentMethod } from './paymentMethod';


export interface Mutation { 
    id: number;
    entryReference: number;
    description: string;
    date: string;
    amount: number;
    debtorIban: string;
    imported: boolean;
    paymentMethod?: PaymentMethod;
    incomeStatement?: IncomeStatement;
}
