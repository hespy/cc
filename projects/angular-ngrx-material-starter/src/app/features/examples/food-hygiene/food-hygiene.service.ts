import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { FoodHygiene, Establishment } from './food-hygiene.model';
import { catchError, map } from 'rxjs/operators';
import {
  HttpHeaders,
  HttpParams,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';

@Injectable()
export class FoodHygieneService {
  constructor(private httpClient: HttpClient) {}

  baseUrl = 'http://api.ratings.food.gov.uk/';

  searchEstablishmentsByName(name: string): Observable<Establishment[]> {
    name = name.trim();

    // Add API Header & search term
    const httpOptions = {
      headers: new HttpHeaders({
        'x-api-version': '2'
      }),
      params: name ? new HttpParams().set('name', name) : {}
    };

    return this.httpClient
      .get<FoodHygiene>(this.baseUrl + 'Establishments', httpOptions)
      .pipe(
        map(resp => resp.establishments),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
