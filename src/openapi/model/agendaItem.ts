/**
 * FPSA API
 * FPSA API documentation
 *
 * The version of the OpenAPI document: 1.0.1
 * Contact: info@fpsa.nl
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export interface AgendaItem { 
    id: number;
    location: string;
    date: string;
    titleNL: string;
    titleEN: string;
    summaryNL: string;
    summaryEN: string;
    descriptionNL: string;
    descriptionEN: string;
    isDraft: boolean;
}
