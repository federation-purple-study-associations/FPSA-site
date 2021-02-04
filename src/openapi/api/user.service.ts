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
/* tslint:disable:no-unused-variable member-ordering */

import { Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import IHttpClient from '../IHttpClient';
import { inject, injectable } from 'inversify';
import { IAPIConfiguration } from '../IAPIConfiguration';
import { Headers } from '../Headers';
import HttpResponse from '../HttpResponse';

import { Application } from '../model/application';
import { ContactFormDTO } from '../model/contactFormDTO';
import { LoginDTO } from '../model/loginDTO';
import { MemberDTO } from '../model/memberDTO';
import { User } from '../model/user';
import { UserActivateDTO } from '../model/userActivateDTO';
import { UserForgotDTO } from '../model/userForgotDTO';
import { UserSummaryDTO } from '../model/userSummaryDTO';

import { COLLECTION_FORMATS }  from '../variables';



@injectable()
export class UserService {
    private basePath: string = 'http://localhost';

    constructor(@inject('IApiHttpClient') private httpClient: IHttpClient,
        @inject('IAPIConfiguration') private APIConfiguration: IAPIConfiguration ) {
        if(this.APIConfiguration.basePath)
            this.basePath = this.APIConfiguration.basePath;
    }

    /**
     * activate
     * This call can be used to activate an account using a confirmation token
     * @param userActivateDTO 
     
     */
    public activate(userActivateDTO: UserActivateDTO, observe?: 'body', headers?: Headers): Observable<any>;
    public activate(userActivateDTO: UserActivateDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public activate(userActivateDTO: UserActivateDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (userActivateDTO === null || userActivateDTO === undefined){
            throw new Error('Required parameter userActivateDTO was null or undefined when calling activate.');
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/activate`, userActivateDTO , headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * accept
     * This call can be used to accept an application
     * @param id 
     
     */
    public applicationAccept(id: number, observe?: 'body', headers?: Headers): Observable<any>;
    public applicationAccept(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public applicationAccept(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling applicationAccept.');
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/application/${encodeURIComponent(String(id))}/accept`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * create
     * This call can be used to create an application
     * @param name 
     * @param email 
     * @param academy 
     * @param establishment 
     * @param kvk 
     * @param websiteUrl 
     * @param photo 
     
     */
    public applicationCreate(name: string, email: string, academy: string, establishment: string, kvk: number, websiteUrl: string, photo: Blob, observe?: 'body', headers?: Headers): Observable<any>;
    public applicationCreate(name: string, email: string, academy: string, establishment: string, kvk: number, websiteUrl: string, photo: Blob, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public applicationCreate(name: string, email: string, academy: string, establishment: string, kvk: number, websiteUrl: string, photo: Blob, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (name === null || name === undefined){
            throw new Error('Required parameter name was null or undefined when calling applicationCreate.');
        }

        if (email === null || email === undefined){
            throw new Error('Required parameter email was null or undefined when calling applicationCreate.');
        }

        if (academy === null || academy === undefined){
            throw new Error('Required parameter academy was null or undefined when calling applicationCreate.');
        }

        if (establishment === null || establishment === undefined){
            throw new Error('Required parameter establishment was null or undefined when calling applicationCreate.');
        }

        if (kvk === null || kvk === undefined){
            throw new Error('Required parameter kvk was null or undefined when calling applicationCreate.');
        }

        if (websiteUrl === null || websiteUrl === undefined){
            throw new Error('Required parameter websiteUrl was null or undefined when calling applicationCreate.');
        }

        if (photo === null || photo === undefined){
            throw new Error('Required parameter photo was null or undefined when calling applicationCreate.');
        }

        headers['Accept'] = 'application/json';

        let formData: FormData = new FormData();
        headers['Content-Type'] = 'multipart/form-data';
        if (name !== undefined) {
            formData.append('name', <any>name);
        }
        if (email !== undefined) {
            formData.append('email', <any>email);
        }
        if (academy !== undefined) {
            formData.append('academy', <any>academy);
        }
        if (establishment !== undefined) {
            formData.append('establishment', <any>establishment);
        }
        if (kvk !== undefined) {
            formData.append('kvk', <any>kvk);
        }
        if (websiteUrl !== undefined) {
            formData.append('websiteUrl', <any>websiteUrl);
        }
        if (photo !== undefined) {
            formData.append('photo', <any>photo);
        }

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/application`, formData, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * decline
     * This call can be used to decline an application
     * @param id 
     
     */
    public applicationDecline(id: number, observe?: 'body', headers?: Headers): Observable<any>;
    public applicationDecline(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public applicationDecline(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling applicationDecline.');
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/application/${encodeURIComponent(String(id))}/decline`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getAll
     * This call can be used to get all applications
     
     */
    public applicationGetAll(observe?: 'body', headers?: Headers): Observable<Array<Application>>;
    public applicationGetAll(observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<Application>>>;
    public applicationGetAll(observe: any = 'body', headers: Headers = {}): Observable<any> {
        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Array<Application>>> = this.httpClient.get(`${this.basePath}/user/application`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <Array<Application>>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getPhoto
     * This call can be used to get the photo of the specific application
     * @param id 
     
     */
    public applicationGetPhoto(id: number, observe?: 'body', headers?: Headers): Observable<any>;
    public applicationGetPhoto(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public applicationGetPhoto(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling applicationGetPhoto.');
        }

        let queryParameters: string[] = [];
        if (id !== undefined) {
            queryParameters.push('id='+encodeURIComponent(String(id)));
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.get(`${this.basePath}/user/application/photo?${queryParameters.join('&')}`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * contact
     * This call can be used to send an email to info@fpsa.nl
     * @param contactFormDTO 
     
     */
    public contact(contactFormDTO: ContactFormDTO, observe?: 'body', headers?: Headers): Observable<any>;
    public contact(contactFormDTO: ContactFormDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public contact(contactFormDTO: ContactFormDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (contactFormDTO === null || contactFormDTO === undefined){
            throw new Error('Required parameter contactFormDTO was null or undefined when calling contact.');
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/contact`, contactFormDTO , headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * contactMembers
     * This call can be used to send an email to all of the members
     * @param subject 
     * @param message 
     * @param attachments 
     
     */
    public contactMembers(subject: string, message: string, attachments: Blob, observe?: 'body', headers?: Headers): Observable<any>;
    public contactMembers(subject: string, message: string, attachments: Blob, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public contactMembers(subject: string, message: string, attachments: Blob, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (subject === null || subject === undefined){
            throw new Error('Required parameter subject was null or undefined when calling contactMembers.');
        }

        if (message === null || message === undefined){
            throw new Error('Required parameter message was null or undefined when calling contactMembers.');
        }

        if (attachments === null || attachments === undefined){
            throw new Error('Required parameter attachments was null or undefined when calling contactMembers.');
        }

        headers['Accept'] = 'application/json';

        let formData: FormData = new FormData();
        headers['Content-Type'] = 'multipart/form-data';
        if (subject !== undefined) {
            formData.append('subject', <any>subject);
        }
        if (message !== undefined) {
            formData.append('message', <any>message);
        }
        if (attachments !== undefined) {
            formData.append('attachments', <any>attachments);
        }

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/contact/members`, formData, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getMe
     * This call can be used to get yourself
     
     */
    public getMe(observe?: 'body', headers?: Headers): Observable<User>;
    public getMe(observe?: 'response', headers?: Headers): Observable<HttpResponse<User>>;
    public getMe(observe: any = 'body', headers: Headers = {}): Observable<any> {
        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<User>> = this.httpClient.get(`${this.basePath}/user/me`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <User>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * login
     * This call can be used to gain access to the resources of FPSA, if you have the scopes for it
     * @param loginDTO 
     
     */
    public login(loginDTO: LoginDTO, observe?: 'body', headers?: Headers): Observable<any>;
    public login(loginDTO: LoginDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public login(loginDTO: LoginDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (loginDTO === null || loginDTO === undefined){
            throw new Error('Required parameter loginDTO was null or undefined when calling login.');
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/login`, loginDTO , headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * updateMe
     * This call can be used to update your own settings
     * @param user 
     
     */
    public updateMe(user: User, observe?: 'body', headers?: Headers): Observable<any>;
    public updateMe(user: User, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public updateMe(user: User, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (user === null || user === undefined){
            throw new Error('Required parameter user was null or undefined when calling updateMe.');
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/me`, user , headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * create
     * This call can be used to create a new user
     * @param fullName 
     * @param email 
     * @param academy 
     * @param establishment 
     * @param kvk 
     * @param websiteUrl 
     * @param roleId 
     * @param photo 
     
     */
    public userCreate(fullName: string, email: string, academy: string, establishment: string, kvk: number, websiteUrl: string, roleId: number, photo: Blob, observe?: 'body', headers?: Headers): Observable<any>;
    public userCreate(fullName: string, email: string, academy: string, establishment: string, kvk: number, websiteUrl: string, roleId: number, photo: Blob, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public userCreate(fullName: string, email: string, academy: string, establishment: string, kvk: number, websiteUrl: string, roleId: number, photo: Blob, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (fullName === null || fullName === undefined){
            throw new Error('Required parameter fullName was null or undefined when calling userCreate.');
        }

        if (email === null || email === undefined){
            throw new Error('Required parameter email was null or undefined when calling userCreate.');
        }

        if (academy === null || academy === undefined){
            throw new Error('Required parameter academy was null or undefined when calling userCreate.');
        }

        if (establishment === null || establishment === undefined){
            throw new Error('Required parameter establishment was null or undefined when calling userCreate.');
        }

        if (kvk === null || kvk === undefined){
            throw new Error('Required parameter kvk was null or undefined when calling userCreate.');
        }

        if (websiteUrl === null || websiteUrl === undefined){
            throw new Error('Required parameter websiteUrl was null or undefined when calling userCreate.');
        }

        if (roleId === null || roleId === undefined){
            throw new Error('Required parameter roleId was null or undefined when calling userCreate.');
        }

        if (photo === null || photo === undefined){
            throw new Error('Required parameter photo was null or undefined when calling userCreate.');
        }

        headers['Accept'] = 'application/json';

        let formData: FormData = new FormData();
        headers['Content-Type'] = 'multipart/form-data';
        if (fullName !== undefined) {
            formData.append('fullName', <any>fullName);
        }
        if (email !== undefined) {
            formData.append('email', <any>email);
        }
        if (academy !== undefined) {
            formData.append('academy', <any>academy);
        }
        if (establishment !== undefined) {
            formData.append('establishment', <any>establishment);
        }
        if (kvk !== undefined) {
            formData.append('kvk', <any>kvk);
        }
        if (websiteUrl !== undefined) {
            formData.append('websiteUrl', <any>websiteUrl);
        }
        if (roleId !== undefined) {
            formData.append('roleId', <any>roleId);
        }
        if (photo !== undefined) {
            formData.append('photo', <any>photo);
        }

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user`, formData, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * delete
     * This call can be used to delete a user
     * @param id 
     
     */
    public userDelete(id: number, observe?: 'body', headers?: Headers): Observable<any>;
    public userDelete(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public userDelete(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling userDelete.');
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.delete(`${this.basePath}/user/${encodeURIComponent(String(id))}`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * forgot
     * This call can be used to send a user an email in order to reset its password
     * @param userForgotDTO 
     
     */
    public userForgot(userForgotDTO: UserForgotDTO, observe?: 'body', headers?: Headers): Observable<any>;
    public userForgot(userForgotDTO: UserForgotDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public userForgot(userForgotDTO: UserForgotDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (userForgotDTO === null || userForgotDTO === undefined){
            throw new Error('Required parameter userForgotDTO was null or undefined when calling userForgot.');
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/forgot`, userForgotDTO , headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getAll
     * This call can be used to get all of the users in the FPSA database
     
     */
    public userGetAll(observe?: 'body', headers?: Headers): Observable<Array<UserSummaryDTO>>;
    public userGetAll(observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<UserSummaryDTO>>>;
    public userGetAll(observe: any = 'body', headers: Headers = {}): Observable<any> {
        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Array<UserSummaryDTO>>> = this.httpClient.get(`${this.basePath}/user`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <Array<UserSummaryDTO>>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getAllFull
     * This call can be used to get all of the users
     
     */
    public userGetAllFull(observe?: 'body', headers?: Headers): Observable<Array<User>>;
    public userGetAllFull(observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<User>>>;
    public userGetAllFull(observe: any = 'body', headers: Headers = {}): Observable<any> {
        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Array<User>>> = this.httpClient.get(`${this.basePath}/user/full`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <Array<User>>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getAllMembers
     * This call can be used to get all of the members of FPSA
     
     */
    public userGetAllMembers(observe?: 'body', headers?: Headers): Observable<Array<MemberDTO>>;
    public userGetAllMembers(observe?: 'response', headers?: Headers): Observable<HttpResponse<Array<MemberDTO>>>;
    public userGetAllMembers(observe: any = 'body', headers: Headers = {}): Observable<any> {
        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<Array<MemberDTO>>> = this.httpClient.get(`${this.basePath}/user/members`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <Array<MemberDTO>>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getOne
     * This call can be used to get one of the users in the FPSA database
     * @param id 
     
     */
    public userGetOne(id: number, observe?: 'body', headers?: Headers): Observable<User>;
    public userGetOne(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<User>>;
    public userGetOne(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling userGetOne.');
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<User>> = this.httpClient.get(`${this.basePath}/user/${encodeURIComponent(String(id))}`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <User>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * getPhoto
     * This call can be used to get the photo of the specific board
     * @param id 
     
     */
    public userGetPhoto(id: number, observe?: 'body', headers?: Headers): Observable<any>;
    public userGetPhoto(id: number, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public userGetPhoto(id: number, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling userGetPhoto.');
        }

        let queryParameters: string[] = [];
        if (id !== undefined) {
            queryParameters.push('id='+encodeURIComponent(String(id)));
        }

        headers['Accept'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.get(`${this.basePath}/user/photo?${queryParameters.join('&')}`, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * update
     * This call can be used to update a user
     * @param id 
     * @param fullName 
     * @param email 
     * @param academy 
     * @param establishment 
     * @param kvk 
     * @param websiteUrl 
     * @param roleId 
     * @param photo 
     
     */
    public userUpdate(id: number, fullName: string, email: string, academy: string, establishment: string, kvk: number, websiteUrl: string, roleId: number, photo?: Blob, observe?: 'body', headers?: Headers): Observable<any>;
    public userUpdate(id: number, fullName: string, email: string, academy: string, establishment: string, kvk: number, websiteUrl: string, roleId: number, photo?: Blob, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public userUpdate(id: number, fullName: string, email: string, academy: string, establishment: string, kvk: number, websiteUrl: string, roleId: number, photo?: Blob, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling userUpdate.');
        }

        if (fullName === null || fullName === undefined){
            throw new Error('Required parameter fullName was null or undefined when calling userUpdate.');
        }

        if (email === null || email === undefined){
            throw new Error('Required parameter email was null or undefined when calling userUpdate.');
        }

        if (academy === null || academy === undefined){
            throw new Error('Required parameter academy was null or undefined when calling userUpdate.');
        }

        if (establishment === null || establishment === undefined){
            throw new Error('Required parameter establishment was null or undefined when calling userUpdate.');
        }

        if (kvk === null || kvk === undefined){
            throw new Error('Required parameter kvk was null or undefined when calling userUpdate.');
        }

        if (websiteUrl === null || websiteUrl === undefined){
            throw new Error('Required parameter websiteUrl was null or undefined when calling userUpdate.');
        }

        if (roleId === null || roleId === undefined){
            throw new Error('Required parameter roleId was null or undefined when calling userUpdate.');
        }

        headers['Accept'] = 'application/json';

        let formData: FormData = new FormData();
        headers['Content-Type'] = 'multipart/form-data';
        if (fullName !== undefined) {
            formData.append('fullName', <any>fullName);
        }
        if (email !== undefined) {
            formData.append('email', <any>email);
        }
        if (academy !== undefined) {
            formData.append('academy', <any>academy);
        }
        if (establishment !== undefined) {
            formData.append('establishment', <any>establishment);
        }
        if (kvk !== undefined) {
            formData.append('kvk', <any>kvk);
        }
        if (websiteUrl !== undefined) {
            formData.append('websiteUrl', <any>websiteUrl);
        }
        if (roleId !== undefined) {
            formData.append('roleId', <any>roleId);
        }
        if (photo !== undefined) {
            formData.append('photo', <any>photo);
        }

        const response: Observable<HttpResponse<any>> = this.httpClient.put(`${this.basePath}/user/${encodeURIComponent(String(id))}`, formData, headers);
        if (observe === 'body') {
               return response.pipe(
                   map((httpResponse: HttpResponse) => <any>(httpResponse.response))
               );
        }
        return response;
    }

}
