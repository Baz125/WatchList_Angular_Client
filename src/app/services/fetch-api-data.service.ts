import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moviedb125.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})
  
/**
 * Contains functionality for user login and registration
 */
  
export class WelcomeScreenApis {
  //Inject the HttpClient module to the constructor params
  //This will provide HttpClient to the entire class, makeing it available via this.http
  constructor(private http: HttpClient) { }
  
  /**
   * makes the api call to the user registration end point
   * 
   * @param {any} arg1 - takes the data from the input form
   */

  
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }


    /**
   * makes the api call to the user login end point
   * 
   * @param {any} arg1 - takes the data from the input form
   */  
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}

