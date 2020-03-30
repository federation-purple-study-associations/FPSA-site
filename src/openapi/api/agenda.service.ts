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
/* tslint:disable:no-unused-variable member-ordering */

import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import IHttpClient from "../IHttpClient";
import { inject, injectable } from "inversify";
import { IAPIConfiguration } from "../IAPIConfiguration";
import { Headers } from "../Headers";
import HttpResponse from "../HttpResponse";

import { AgendaAllDTO } from "../model/agendaAllDTO";
import { AgendaDetailsDTO } from "../model/agendaDetailsDTO";
import { AgendaItem } from "../model/agendaItem";

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
     * create
     * This call can be used to get the one agenda item of FPSA
     * @param location 
     * @param date 
     * @param titleNL 
     * @param titleEN 
     * @param summaryNL 
     * @param summaryEN 
     * @param descriptionNL 
     * @param descriptionEN 
     * @param isDraft 
     * @param image 
     
     */
    public agendaCreateNew(location: string, date: string, titleNL: string, titleEN: string, summaryNL: string, summaryEN: string, descriptionNL: string, descriptionEN: string, isDraft: boolean, image: Blob, observe?: 'body', headers?: Headers): Observable<any>;
    public agendaCreateNew(location: string, date: string, titleNL: string, titleEN: string, summaryNL: string, summaryEN: string, descriptionNL: string, descriptionEN: string, isDraft: boolean, image: Blob, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public agendaCreateNew(location: string, date: string, titleNL: string, titleEN: string, summaryNL: string, summaryEN: string, descriptionNL: string, descriptionEN: string, isDraft: boolean, image: Blob, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (location === null || location === undefined){
            throw new Error('Required parameter location was null or undefined when calling agendaCreateNew.');
        }

        if (date === null || date === undefined){
            throw new Error('Required parameter date was null or undefined when calling agendaCreateNew.');
        }

        if (titleNL === null || titleNL === undefined){
            throw new Error('Required parameter titleNL was null or undefined when calling agendaCreateNew.');
        }

        if (titleEN === null || titleEN === undefined){
            throw new Error('Required parameter titleEN was null or undefined when calling agendaCreateNew.');
        }

        if (summaryNL === null || summaryNL === undefined){
            throw new Error('Required parameter summaryNL was null or undefined when calling agendaCreateNew.');
        }

        if (summaryEN === null || summaryEN === undefined){
            throw new Error('Required parameter summaryEN was null or undefined when calling agendaCreateNew.');
        }

        if (descriptionNL === null || descriptionNL === undefined){
            throw new Error('Required parameter descriptionNL was null or undefined when calling agendaCreateNew.');
        }

        if (descriptionEN === null || descriptionEN === undefined){
            throw new Error('Required parameter descriptionEN was null or undefined when calling agendaCreateNew.');
        }

        if (isDraft === null || isDraft === undefined){
            throw new Error('Required parameter isDraft was null or undefined when calling agendaCreateNew.');
        }

        if (image === null || image === undefined){
            throw new Error('Required parameter image was null or undefined when calling agendaCreateNew.');
        }

        headers['Accept'] = 'application/json';

        let formData: FormData = new FormData();
        headers['Content-Type'] = 'multipart/form-data';
        if (location !== undefined) {
            formData.append('location', <any>location);
        }
        if (date !== undefined) {
            formData.append('date', <any>date);
        }
        if (titleNL !== undefined) {
            formData.append('titleNL', <any>titleNL);
        }
        if (titleEN !== undefined) {
            formData.append('titleEN', <any>titleEN);
        }
        if (summaryNL !== undefined) {
            formData.append('summaryNL', <any>summaryNL);
        }
        if (summaryEN !== undefined) {
            formData.append('summaryEN', <any>summaryEN);
        }
        if (descriptionNL !== undefined) {
            formData.append('descriptionNL', <any>descriptionNL);
        }
        if (descriptionEN !== undefined) {
            formData.append('descriptionEN', <any>descriptionEN);
        }
        if (isDraft !== undefined) {
            formData.append('isDraft', <any>isDraft);
        }
        if (image !== undefined) {
            formData.append('image', <any>image);
        }

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/agenda`, formData, headers);
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
    public agendaGetAll(lang: string, skip: number, size: number, observe?: 'body', headers?: Headers): Observable<AgendaAllDTO>;
    public agendaGetAll(lang: string, skip: number, size: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<AgendaAllDTO>>;
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

        const response: Observable<HttpResponse<AgendaAllDTO>> = this.httpClient.get(`${this.basePath}/agenda?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <AgendaAllDTO>(httpResponse.response))
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
     * getOriginalOne
     * This call can be used to get one agenda item of FPSA
     * @param id 
     
     */
    public agendaGetOriginalOne(id: number, observe?: 'body', headers?: Headers): Observable<AgendaItem>;
    public agendaGetOriginalOne(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<AgendaItem>>;
    public agendaGetOriginalOne(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling agendaGetOriginalOne.');
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<AgendaItem>> = this.httpClient.get(`${this.basePath}/agenda/original/${encodeURIComponent(String(id))}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <AgendaItem>(httpResponse.response))
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
     * @param location 
     * @param date 
     * @param titleNL 
     * @param titleEN 
     * @param summaryNL 
     * @param summaryEN 
     * @param descriptionNL 
     * @param descriptionEN 
     * @param isDraft 
     * @param image 
     
     */
    public agendaUpdate(id: number, location: string, date: string, titleNL: string, titleEN: string, summaryNL: string, summaryEN: string, descriptionNL: string, descriptionEN: string, isDraft: boolean, image?: Blob, observe?: 'body', headers?: Headers): Observable<any>;
    public agendaUpdate(id: number, location: string, date: string, titleNL: string, titleEN: string, summaryNL: string, summaryEN: string, descriptionNL: string, descriptionEN: string, isDraft: boolean, image?: Blob, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public agendaUpdate(id: number, location: string, date: string, titleNL: string, titleEN: string, summaryNL: string, summaryEN: string, descriptionNL: string, descriptionEN: string, isDraft: boolean, image?: Blob, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling agendaUpdate.');
        }

        if (location === null || location === undefined){
            throw new Error('Required parameter location was null or undefined when calling agendaUpdate.');
        }

        if (date === null || date === undefined){
            throw new Error('Required parameter date was null or undefined when calling agendaUpdate.');
        }

        if (titleNL === null || titleNL === undefined){
            throw new Error('Required parameter titleNL was null or undefined when calling agendaUpdate.');
        }

        if (titleEN === null || titleEN === undefined){
            throw new Error('Required parameter titleEN was null or undefined when calling agendaUpdate.');
        }

        if (summaryNL === null || summaryNL === undefined){
            throw new Error('Required parameter summaryNL was null or undefined when calling agendaUpdate.');
        }

        if (summaryEN === null || summaryEN === undefined){
            throw new Error('Required parameter summaryEN was null or undefined when calling agendaUpdate.');
        }

        if (descriptionNL === null || descriptionNL === undefined){
            throw new Error('Required parameter descriptionNL was null or undefined when calling agendaUpdate.');
        }

        if (descriptionEN === null || descriptionEN === undefined){
            throw new Error('Required parameter descriptionEN was null or undefined when calling agendaUpdate.');
        }

        if (isDraft === null || isDraft === undefined){
            throw new Error('Required parameter isDraft was null or undefined when calling agendaUpdate.');
        }

        headers['Accept'] = 'application/json';

        let formData: FormData = new FormData();
        headers['Content-Type'] = 'multipart/form-data';
        if (location !== undefined) {
            formData.append('location', <any>location);
        }
        if (date !== undefined) {
            formData.append('date', <any>date);
        }
        if (titleNL !== undefined) {
            formData.append('titleNL', <any>titleNL);
        }
        if (titleEN !== undefined) {
            formData.append('titleEN', <any>titleEN);
        }
        if (summaryNL !== undefined) {
            formData.append('summaryNL', <any>summaryNL);
        }
        if (summaryEN !== undefined) {
            formData.append('summaryEN', <any>summaryEN);
        }
        if (descriptionNL !== undefined) {
            formData.append('descriptionNL', <any>descriptionNL);
        }
        if (descriptionEN !== undefined) {
            formData.append('descriptionEN', <any>descriptionEN);
        }
        if (isDraft !== undefined) {
            formData.append('isDraft', <any>isDraft);
        }
        if (image !== undefined) {
            formData.append('image', <any>image);
        }

        const response: Observable<HttpResponse<any>> = this.httpClient.put(`${this.basePath}/agenda/${encodeURIComponent(String(id))}`, formData, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }

}
