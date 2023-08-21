import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api rul that will provide data for the client app
const apiUrl = 'https://moviedb125.herokuapp.com/'

//attempting to define handleError once so I don't need to repeat it but it's not working
// const handleError(error: HttpErrorResponse): any {
//   if (error.error instanceof ErrorEvent) {
//     console.error('Some error occurred: ', error.error.message);
//   } else {
//     console.error(
//       `Error Status code ${error.status}, ` +
//       `Error body is: ${error.error}`);
//   }
//   return throwError(
//     'Something bad happened; please try again later.');
// }


@Injectable({
  providedIn: 'root'
})
  
export class FetchApiDataService {
  //Inject the HttpClient module to the constructor params
  //This will provide HttpClient to the entire class, makeing it available via this.http
  constructor(private http: HttpClient) { }
  //Making the api call for the user registration end point
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  getOneMovie(movieTitle: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/ ' + movieTitle, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors/ ' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres/ ' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/ ' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  getUsersFavorites(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/ ' + username + 'favoritemovies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  addFavorite(username: any, _id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/ ' + username + 'favoritemovies/' + _id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteFavorite(username: any, _id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/ ' + username + 'favoritemovies/' + _id, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  editUser(username: any, editUserDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/ ' + username, editUserDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/ ' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
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


//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
// }

// export class UserLoginService {
//   constructor(private http: HttpClient) { }

//   public userLogin(userDetails: any): Observable<any> {
//     return this.http.post(apiUrl + 'login', userDetails).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }
// }

// export class GetAllMoviesService {
//   constructor(private http: HttpClient) { }

//   getAllMovies(): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
//       {
//         Authorization: 'Bearer ' + token,
//       })}).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }

//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
// }

// export class getOneMovieService {
//   constructor(private http: HttpClient) { }

//   public getOneMovie(movieTitle: any): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.get(apiUrl + 'movies/ ' + movieTitle, {headers: new HttpHeaders(
//       {
//         Authorization: 'Bearer ' + token,
//       })}).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }
// }

// export class getDirectorService {
//   constructor(private http: HttpClient) { }

//   public getDirector(directorName: any): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.get(apiUrl + 'directors/ ' + directorName, {headers: new HttpHeaders(
//       {
//         Authorization: 'Bearer ' + token,
//       })}).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }
// }

// export class getGenreService {
//   constructor(private http: HttpClient) { }

//   public getGenre(genreName: any): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.get(apiUrl + 'genres/ ' + genreName, {headers: new HttpHeaders(
//       {
//         Authorization: 'Bearer ' + token,
//       })}).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }
// }

// export class getUserService {
//   constructor(private http: HttpClient) { }

//   public getUser(username: any): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.get(apiUrl + 'users/ ' + username, {headers: new HttpHeaders(
//       {
//         Authorization: 'Bearer ' + token,
//       })}).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }
// }


// export class getUsersFavorites {
//   constructor(private http: HttpClient) { }

//   public getUsersFavorites(username: any): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.get(apiUrl + 'users/ ' + username + 'favoritemovies', {headers: new HttpHeaders(
//       {
//         Authorization: 'Bearer ' + token,
//       })}).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }
// }

// export class addFavoriteService {
//   constructor(private http: HttpClient) { }

//   public addFavorite(username: any, _id: string): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.put(apiUrl + 'users/ ' + username + 'favoritemovies/' + _id, {headers: new HttpHeaders(
//       {
//         Authorization: 'Bearer ' + token,
//       })}).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }
// }

// export class deleteFavoriteService {
//   constructor(private http: HttpClient) { }

//   public deleteFavorite(username: any, _id: string): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.delete(apiUrl + 'users/ ' + username + 'favoritemovies/' + _id, {headers: new HttpHeaders(
//       {
//         Authorization: 'Bearer ' + token,
//       })}).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }
// }

// export class editUserService {
//   constructor(private http: HttpClient) { }

//   public editUser(username: any, editUserDetails: any): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.put(apiUrl + 'users/ ' + username, editUserDetails, {headers: new HttpHeaders(
//       {
//         Authorization: 'Bearer ' + token,
//       })}).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }
// }


// export class deleteUserService {
//   constructor(private http: HttpClient) { }

//   public deleteUser(username: any): Observable<any> {
//     const token = localStorage.getItem('token');
//     return this.http.delete(apiUrl + 'users/ ' + username, {headers: new HttpHeaders(
//       {
//         Authorization: 'Bearer ' + token,
//       })}).pipe(
//       map(this.extractResponseData),
//       catchError(this.handleError)
//     );
//   }
//   private handleError(error: HttpErrorResponse): any {
//     if (error.error instanceof ErrorEvent) {
//       console.error('Some error occurred: ', error.error.message);
//     } else {
//       console.error(
//         `Error Status code ${error.status}, ` +
//         `Error body is: ${error.error}`);
//     }
//     return throwError(
//       'Something bad happened; please try again later.');
//   }
//   private extractResponseData(res: any): any {
//     const body = res;
//     return body || { };
//   }
// }