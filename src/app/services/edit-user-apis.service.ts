/**
 * Service for editing user data and performing user-related API actions.
 */
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://moviedb125.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class EditUserApisService {
  constructor(private http: HttpClient) {}

  /**
   * Edit user information.
   *
   * @param username - The username of the user to edit.
   * @param editUserDetails - The user details to be updated.
   * @returns An observable representing the HTTP response from the API.
   */
  editUser(username: any, editUserDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + username, editUserDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Delete a user account.
   *
   * @param username - The username of the user to delete.
   * @returns An observable representing the HTTP response from the API.
   */
  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/ ' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Handle HTTP error responses.
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
   * Extract response data from an HTTP response.
   *
   * @param res - The HTTP response.
   * @returns The extracted response data.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }
}
