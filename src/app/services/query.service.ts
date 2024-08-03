import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, output } from "@angular/core";

@Injectable({
    providedIn:"root"
})

export class QueryService {

    constructor(private http:HttpClient) {

    }
    
    url = 'https://merckpoc2-microservice.1g6wvc9yqptt.us-east.codeengine.appdomain.cloud/invokesearch/';


    callConverse(query:string) {
        
    const finalURL = `${this.url}${query}`;

        return this.http.get(finalURL);
    } 
}