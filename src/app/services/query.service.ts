import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, output } from "@angular/core";

@Injectable({
    providedIn:"root"
})

export class QueryService {

    constructor(private http:HttpClient) {

    }
    
    url = 'http://169.63.181.214:5000/invokesearch/';


    callConverse(query:string) {
        
    const finalURL = `${this.url}${query}`;

        return this.http.get(finalURL);
    } 
}