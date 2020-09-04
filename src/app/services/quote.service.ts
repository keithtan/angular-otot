import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Quote} from '../models/quote';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private quoteUrl = 'https://spring-rest-otot.herokuapp.com/quotes';

  constructor(private http: HttpClient) { }

  getQuotes() {
    return this.http.get<Quote[]>(this.quoteUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  addQuote(quote: Quote) {
    return this.http.post<Quote>(this.quoteUrl, quote)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateQuote(quote: Quote) {
    return this.http.put<Quote>(`${this.quoteUrl}/${quote.id}`, quote)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteQuote(quoteId: number) {
    return this.http.delete(`${this.quoteUrl}/${quoteId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
