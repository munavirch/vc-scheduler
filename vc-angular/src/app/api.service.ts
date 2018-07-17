import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const httpOptions = {
	headers: new HttpHeaders({'content-type': 'application/json'})
};
var endpoint = "http://127.0.0.1:8000/";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  get(uri: string){
    console.log(uri);
  	return this.http.get(this.getUrl(uri))
      .pipe(
      catchError(this.handleError)
    );
  }

  post(uri: string, data: Object){
    data = JSON.stringify(data);
  	return this.http.post(this.getUrl(uri), data, httpOptions)
      .pipe(
      catchError(this.handleError)
      );
  }

  patch(uri: string, data: Object){
    data = JSON.stringify(data);
    return this.http.patch(this.getUrl(uri), data, httpOptions)
      .pipe(
      catchError(this.handleError)
    );
  }

  delete(uri: string){
    return this.http.delete(this.getUrl(uri))
      .pipe(
      catchError(this.handleError)
    );
  }

  getUrl(uri: string): string{
  	return endpoint+uri;
  }

  private handleError(error: HttpErrorResponse){
    console.log(error);
    if(error instanceof ErrorEvent){
      return throwError('Network error occurred. Try again later.');
    }else{
      return throwError('There was an error processing request: '+error.message);
    }
  }
  
}
