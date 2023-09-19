/**
 * Service for interacting with user-related APIs and managing user data.
 */
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://moviedb125.herokuapp.com/'

@Injectable({
  providedIn: 'root'
})
  
export class UserDataApisService {

  constructor(private http: HttpClient) { }

    /**
   * Retrieves user data for the currently authenticated user.
   *
   * @returns An observable representing the HTTP response containing user data.
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
   * Retrieves a user's favorite movies by username.
   *
   * @param username - The username of the user to fetch favorites for.
   * @returns An observable representing the HTTP response containing user's favorite movies.
   */
  getUsersFavorites(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username + 'favoritemovies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
   * Adds a movie to a user's favorites.
   *
   * @param username - The username of the user to add the movie to.
   * @param _id - The movie ID to add to the user's favorites.
   * @returns An observable representing the HTTP response confirming the addition.
   */
  addFavorite(username: any, _id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username + '/movies/' + _id, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

    /**
   * Removes a movie from a user's favorites.
   *
   * @param username - The username of the user to remove the movie from.
   * @param _id - The movie ID to remove from the user's favorites.
   * @returns An observable representing the HTTP response confirming the removal.
   */
  deleteFavorite(username: any, _id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + _id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
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
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
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

