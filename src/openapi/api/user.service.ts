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

import { Observable } from "rxjs";

import { map } from "rxjs/operators";
import IHttpClient from "../IHttpClient";
import { inject, injectable } from "inversify";
import { IAPIConfiguration } from "../IAPIConfiguration";
import { Headers } from "../Headers";
import HttpResponse from "../HttpResponse";

import { Application } from "../model/application";
import { ContactFormDTO } from "../model/contactFormDTO";
import { ContactMembersDTO } from "../model/contactMembersDTO";
import { LoginDTO } from "../model/loginDTO";
import { NewApplication } from "../model/newApplication";
import { User } from "../model/user";
import { UserActivateDTO } from "../model/userActivateDTO";
import { UserForgotDTO } from "../model/userForgotDTO";
import { UserNewDTO } from "../model/userNewDTO";
import { UserSummaryDTO } from "../model/userSummaryDTO";
import { UserUpdateDTO } from "../model/userUpdateDTO";

import { COLLECTION_FORMATS }  from "../variables";



@injectable()
export class UserService {
    private basePath: string = 'http://localhost';

    constructor(@inject("IApiHttpClient") private httpClient: IHttpClient,
        @inject("IAPIConfiguration") private APIConfiguration: IAPIConfiguration ) {
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * create
     * This call can be used to create an application
     * @param newApplication 
     
     */
    public applicationCreate(newApplication: NewApplication, observe?: 'body', headers?: Headers): Observable<any>;
    public applicationCreate(newApplication: NewApplication, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public applicationCreate(newApplication: NewApplication, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (newApplication === null || newApplication === undefined){
            throw new Error('Required parameter newApplication was null or undefined when calling applicationCreate.');
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/application`, newApplication , headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <Array<Application>>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * contactMembers
     * This call can be used to send an email to all of the members
     * @param contactMembersDTO 
     
     */
    public contactMembers(contactMembersDTO: ContactMembersDTO, observe?: 'body', headers?: Headers): Observable<any>;
    public contactMembers(contactMembersDTO: ContactMembersDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public contactMembers(contactMembersDTO: ContactMembersDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (contactMembersDTO === null || contactMembersDTO === undefined){
            throw new Error('Required parameter contactMembersDTO was null or undefined when calling contactMembers.');
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user/contact/members`, contactMembersDTO , headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <User>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * create
     * This call can be used to create a new user
     * @param userNewDTO 
     
     */
    public userCreate(userNewDTO: UserNewDTO, observe?: 'body', headers?: Headers): Observable<any>;
    public userCreate(userNewDTO: UserNewDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public userCreate(userNewDTO: UserNewDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (userNewDTO === null || userNewDTO === undefined){
            throw new Error('Required parameter userNewDTO was null or undefined when calling userCreate.');
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.post(`${this.basePath}/user`, userNewDTO , headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <Array<UserSummaryDTO>>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <Array<User>>(httpResponse.response))
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
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <User>(httpResponse.response))
               );
        }
        return response;
    }


    /**
     * update
     * This call can be used to update a user
     * @param id 
     * @param userUpdateDTO 
     
     */
    public userUpdate(id: number, userUpdateDTO: UserUpdateDTO, observe?: 'body', headers?: Headers): Observable<any>;
    public userUpdate(id: number, userUpdateDTO: UserUpdateDTO, observe?: 'response', headers?: Headers): Observable<HttpResponse<any>>;
    public userUpdate(id: number, userUpdateDTO: UserUpdateDTO, observe: any = 'body', headers: Headers = {}): Observable<any> {
        if (id === null || id === undefined){
            throw new Error('Required parameter id was null or undefined when calling userUpdate.');
        }

        if (userUpdateDTO === null || userUpdateDTO === undefined){
            throw new Error('Required parameter userUpdateDTO was null or undefined when calling userUpdate.');
        }

        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        const response: Observable<HttpResponse<any>> = this.httpClient.put(`${this.basePath}/user/${encodeURIComponent(String(id))}`, userUpdateDTO , headers);
        if (observe == 'body') {
               return response.pipe(
                   map(httpResponse => <any>(httpResponse.response))
               );
        }
        return response;
    }

}
