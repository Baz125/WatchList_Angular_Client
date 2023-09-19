/**
 * Service for fetching movie-related data from the MovieDB API.
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
export class MovieDataApisService {
  constructor(private http: HttpClient) {}

  /**
   * Retrieves a list of all movies from the API.
   *
   * @returns An observable representing the HTTP response containing movie data.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  /**
   * Retrieves information about a specific movie by its title from the API.
   *
   * @param movieTitle - The title of the movie to retrieve.
   * @returns An observable representing the HTTP response containing movie details.
   */
  getOneMovie(movieTitle: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/ ' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves information about a director by their name from the API.
   *
   * @param directorName - The name of the director to retrieve.
   * @returns An observable representing the HTTP response containing director details.
   */
  getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'directors/ ' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves information about a genre by its name from the API.
   *
   * @param genreName - The name of the genre to retrieve.
   * @returns An observable representing the HTTP response containing genre details.
   */
  getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres/ ' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
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
