/**
 * FPSA API
 * FPSA API documentation
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: info@fpsa.nl
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import IHttpClient from "../IHttpClient";
import { inject, injectable } from "inversify";
import { IAPIConfiguration } from "../IAPIConfiguration";
import { Headers } from "../Headers";
import HttpResponse from "../HttpResponse";

import { AgendaDetailsDTO } from "../model/agendaDetailsDTO";
import { AgendaSummaryDTO } from "../model/agendaSummaryDTO";
import { NewAgendaDTO } from "../model/newAgendaDTO";

import { COLLECTION_FORMATS }  from "../variables";



@injectable()
export class AgendaService {
    private basePath: string = 'http://localhost';

    constructor(@inject("IApiHttpClient") private httpClient: IHttpClient,
        @inject("IAPIConfiguration") private APIConfiguration: IAPIConfiguration ) {
        if(this.APIConfiguration.basePath)
            this.basePath = this.APIConfiguration.basePath;
    }

    /**
     * getOne
     * This call can be used to get the one agenda item of FPSA
     * @param newAgendaDTO 
     
     */
    public agendaCreateNew(newAgendaDTO: NewAgendaDTO, observe?: 'body', headers?: Headers): Observable<any>;
    public agendaCreateNew(newAgendaDTO: NewAgendaDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public agendaCreateNew(newAgendaDTO: NewAgendaDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (newAgendaDTO === null || newAgendaDTO === undefined){
            throw new Error('Required parameter newAgendaDTO was null or undefined when calling agendaCreateNew.');
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/agenda`, newAgendaDTO , headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * delete
     * This call can be used to delete one agenda item of FPSA
     * @param id 
     
     */
    public agendaDelete(id: number, observe?: 'body', headers?: Headers): Observable<any>;
    public agendaDelete(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public agendaDelete(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling agendaDelete.');
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(`${this.basePath}/agenda/${encodeURIComponent(String(id))}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getAll
     * This call can be used to get the complete agenda of FPSA
     * @param lang 
     * @param skip 
     * @param size 
     
     */
    public agendaGetAll(lang: string, skip: number, size: number, observe?: 'body', headers?: Headers): Observable<Array<AgendaSummaryDTO>>;
    public agendaGetAll(lang: string, skip: number, size: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<AgendaSummaryDTO>>>;
    public agendaGetAll(lang: string, skip: number, size: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (lang === null || lang === undefined){
            throw new Error('Required parameter lang was null or undefined when calling agendaGetAll.');
        }

        if (skip === null || skip === undefined){
            throw new Error('Required parameter skip was null or undefined when calling agendaGetAll.');
        }

        if (size === null || size === undefined){
            throw new Error('Required parameter size was null or undefined when calling agendaGetAll.');
        }

        let queryParameters: string[] = [];
        if (lang !== undefined) {
            queryParameters.push("lang="+encodeURIComponent(String(lang)));
        }
        if (skip !== undefined) {
            queryParameters.push("skip="+encodeURIComponent(String(skip)));
        }
        if (size !== undefined) {
            queryParameters.push("size="+encodeURIComponent(String(size)));
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Array<AgendaSummaryDTO>>> = this.httpClient.get(`${this.basePath}/agenda?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <Array<AgendaSummaryDTO>>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getOne
     * This call can be used to get the one agenda item of FPSA
     * @param id 
     * @param lang 
     
     */
    public agendaGetOne(id: number, lang: string, observe?: 'body', headers?: Headers): Observable<AgendaDetailsDTO>;
    public agendaGetOne(id: number, lang: string, observe?: 'response', headers?: Headers): Observable<HttpResponse<AgendaDetailsDTO>>;
    public agendaGetOne(id: number, lang: string, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling agendaGetOne.');
        }

        if (lang === null || lang === undefined){
            throw new Error('Required parameter lang was null or undefined when calling agendaGetOne.');
        }

        let queryParameters: string[] = [];
        if (lang !== undefined) {
            queryParameters.push("lang="+encodeURIComponent(String(lang)));
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<AgendaDetailsDTO>> = this.httpClient.get(`${this.basePath}/agenda/${encodeURIComponent(String(id))}?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <AgendaDetailsDTO>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getPicture
     * This call can be used to get the image of an agenda item
     * @param id 
     
     */
    public agendaGetPicture(id: number, observe?: 'body', headers?: Headers): Observable<any>;
    public agendaGetPicture(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public agendaGetPicture(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling agendaGetPicture.');
        }

        let queryParameters: string[] = [];
        if (id !== undefined) {
            queryParameters.push("id="+encodeURIComponent(String(id)));
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.get(`${this.basePath}/agenda/photo?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * update
     * This call can be used to update one agenda item of FPSA
     * @param id 
     
     */
    public agendaUpdate(id: number, observe?: 'body', headers?: Headers): Observable<any>;
    public agendaUpdate(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public agendaUpdate(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling agendaUpdate.');
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.put(`${this.basePath}/agenda/${encodeURIComponent(String(id))}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }

}
