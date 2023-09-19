/**
 * Service for user registration and login
 */
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://moviedb125.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class WelcomeScreenApis {
  //Inject the HttpClient module to the constructor params
  //This will provide HttpClient to the entire class, makeing it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * Registers a new user by making an API call to the user registration endpoint.
   *
   * @param userDetails - User registration details obtained from the input form.
   * @returns An observable representing the HTTP response from the registration API.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs in a user by making an API call to the user login endpoint.
   *
   * @param userDetails - User login credentials obtained from the input form.
   * @returns An observable representing the HTTP response from the login API.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Handles HTTP error responses.
   *
   * @param error - The HTTP error response.
   * @returns An observable that emits an error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Extracts response data from an HTTP response.
   *
   * @param res - The HTTP response.
   * @returns The extracted response data or an empty object.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
