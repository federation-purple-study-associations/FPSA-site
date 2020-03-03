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

import { Board } from "../model/board";
import { BoardInfoDTO } from "../model/boardInfoDTO";

import { COLLECTION_FORMATS }  from "../variables";



@injectable()
export class BoardService {
    private basePath: string = 'http://localhost';

    constructor(@inject("IApiHttpClient") private httpClient: IHttpClient,
        @inject("IAPIConfiguration") private APIConfiguration: IAPIConfiguration ) {
        if(this.APIConfiguration.basePath)
            this.basePath = this.APIConfiguration.basePath;
    }

    /**
     * create
     * This call can be used to a new board for FPSA
     * @param titleNL 
     * @param titleEN 
     * @param textNL 
     * @param textEN 
     * @param image 
     
     */
    public boardCreate(titleNL: string, titleEN: string, textNL: string, textEN: string, image?: Blob, observe?: 'body', headers?: Headers): Observable<any>;
    public boardCreate(titleNL: string, titleEN: string, textNL: string, textEN: string, image?: Blob, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public boardCreate(titleNL: string, titleEN: string, textNL: string, textEN: string, image?: Blob, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (titleNL === null || titleNL === undefined){
            throw new Error('Required parameter titleNL was null or undefined when calling boardCreate.');
        }

        if (titleEN === null || titleEN === undefined){
            throw new Error('Required parameter titleEN was null or undefined when calling boardCreate.');
        }

        if (textNL === null || textNL === undefined){
            throw new Error('Required parameter textNL was null or undefined when calling boardCreate.');
        }

        if (textEN === null || textEN === undefined){
            throw new Error('Required parameter textEN was null or undefined when calling boardCreate.');
        }

        headers['Accept'] = 'application/json';

        let formData: FormData = new FormData();
        headers['Content-Type'] = 'multipart/form-data';
        if (titleNL !== undefined) {
            formData.append('titleNL', <any>titleNL);
        }
        if (titleEN !== undefined) {
            formData.append('titleEN', <any>titleEN);
        }
        if (textNL !== undefined) {
            formData.append('textNL', <any>textNL);
        }
        if (textEN !== undefined) {
            formData.append('textEN', <any>textEN);
        }
        if (image !== undefined) {
            formData.append('image', <any>image);
        }

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/board`, formData, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * delete
     * This call can be used to delete a board of FPSA
     * @param id 
     
     */
    public boardDelete(id: number, observe?: 'body', headers?: Headers): Observable<any>;
    public boardDelete(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public boardDelete(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling boardDelete.');
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(`${this.basePath}/board/${encodeURIComponent(String(id))}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getAll
     * This call can be used to get all of the boards of FPSA
     * @param lang 
     * @param skip 
     * @param size 
     
     */
    public boardGetAll(lang: string, skip: number, size: number, observe?: 'body', headers?: Headers): Observable<Array<BoardInfoDTO>>;
    public boardGetAll(lang: string, skip: number, size: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<BoardInfoDTO>>>;
    public boardGetAll(lang: string, skip: number, size: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (lang === null || lang === undefined){
            throw new Error('Required parameter lang was null or undefined when calling boardGetAll.');
        }

        if (skip === null || skip === undefined){
            throw new Error('Required parameter skip was null or undefined when calling boardGetAll.');
        }

        if (size === null || size === undefined){
            throw new Error('Required parameter size was null or undefined when calling boardGetAll.');
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

        const response: Observable<HttpResponse<Array<BoardInfoDTO>>> = this.httpClient.get(`${this.basePath}/board?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <Array<BoardInfoDTO>>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getOriginalOne
     * This call can be used to get a board of FPSA
     * @param id 
     
     */
    public boardGetOriginalOne(id: number, observe?: 'body', headers?: Headers): Observable<Board>;
    public boardGetOriginalOne(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<Board>>;
    public boardGetOriginalOne(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling boardGetOriginalOne.');
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Board>> = this.httpClient.get(`${this.basePath}/board/original/${encodeURIComponent(String(id))}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <Board>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getPhoto
     * This call can be used to get the photo of the specific board of FPSA
     * @param id 
     
     */
    public boardGetPhoto(id: number, observe?: 'body', headers?: Headers): Observable<Array<BoardInfoDTO>>;
    public boardGetPhoto(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<BoardInfoDTO>>>;
    public boardGetPhoto(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling boardGetPhoto.');
        }

        let queryParameters: string[] = [];
        if (id !== undefined) {
            queryParameters.push("id="+encodeURIComponent(String(id)));
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Array<BoardInfoDTO>>> = this.httpClient.get(`${this.basePath}/board/photo?${queryParameters.join('&')}`, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <Array<BoardInfoDTO>>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * update
     * This call can be used to update a board of FPSA
     * @param id 
     * @param titleNL 
     * @param titleEN 
     * @param textNL 
     * @param textEN 
     * @param image 
     
     */
    public boardpdate(id: number, titleNL: string, titleEN: string, textNL: string, textEN: string, image?: Blob, observe?: 'body', headers?: Headers): Observable<any>;
    public boardpdate(id: number, titleNL: string, titleEN: string, textNL: string, textEN: string, image?: Blob, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public boardpdate(id: number, titleNL: string, titleEN: string, textNL: string, textEN: string, image?: Blob, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling boardpdate.');
        }

        if (titleNL === null || titleNL === undefined){
            throw new Error('Required parameter titleNL was null or undefined when calling boardpdate.');
        }

        if (titleEN === null || titleEN === undefined){
            throw new Error('Required parameter titleEN was null or undefined when calling boardpdate.');
        }

        if (textNL === null || textNL === undefined){
            throw new Error('Required parameter textNL was null or undefined when calling boardpdate.');
        }

        if (textEN === null || textEN === undefined){
            throw new Error('Required parameter textEN was null or undefined when calling boardpdate.');
        }

        headers['Accept'] = 'application/json';

        let formData: FormData = new FormData();
        headers['Content-Type'] = 'multipart/form-data';
        if (titleNL !== undefined) {
            formData.append('titleNL', <any>titleNL);
        }
        if (titleEN !== undefined) {
            formData.append('titleEN', <any>titleEN);
        }
        if (textNL !== undefined) {
            formData.append('textNL', <any>textNL);
        }
        if (textEN !== undefined) {
            formData.append('textEN', <any>textEN);
        }
        if (image !== undefined) {
            formData.append('image', <any>image);
        }

        const response: Observable<HttpResponse<any>> = this.httpClient.put(`${this.basePath}/board/${encodeURIComponent(String(id))}`, formData, headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }

}
