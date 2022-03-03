import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Smartphone} from './smartphone';
import { Observable,catchError, retry,of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


const localUrl = 'assets/data/smartphone.json';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/xml',
    'Authorization': 'jwt-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpClient
  ) { }

  //get the data from the JSON file
  // getSmartphone(): Observable<HttpResponse<Smartphone>>{
  //  // return this.http.get(localUrl);
  //   return this.http.get<Smartphone>(
  //     localUrl, {observe:'response'});
  // }


  // GET data with error handler
  // getSmartphone(): Observable<any>{
  //   httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
  //   return this.http.get<Smartphone[]>(localUrl,httpOptions ).pipe(
  //     catchError(
  //       this.handleError<Smartphone[]>('getSmartphone', []))
  //   );
  // }


    // GET data with custom params
  // getSmartphone(term: string): Observable<any> {
  //   term = term.trim();
  //   const options = term ? { params: new HttpParams().set('name', term) } : {};
  //   httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
  //   return this.http.get<Smartphone[]>(localUrl, options).pipe(
  //     retry(3), catchError(this.handleError<Smartphone[]>('getSmartphone', [])));
  // }


  getSmartphone(): Observable<any> {
    const stringparams = 'name=iphone';
    const params = new HttpParams({fromString: stringparams});
    const options = { params };
    return this.http.get<Smartphone[]>(localUrl, options).pipe(
      retry(3), catchError(this.handleError<Smartphone[]>('getSmartphone', [])));
  }
  getSmartphoneById(id: any): Observable<any>{
    return this.http.get<Smartphone>(localUrl + id)
    .pipe( 
      retry(3),catchError(this.handleError<Smartphone>('getSmartphone')));
  }
  addSmartphone(smartphone: Smartphone): Observable<Smartphone>{
    return this.http.post<Smartphone>(localUrl, smartphone, httpOptions)
    .pipe(
      catchError(this.handleError('addSmartphone', smartphone))
    );
  }
  updateSmartphone(id: any, smartphone: Smartphone): Observable<Smartphone> {
    return this.http.put<Smartphone>(localUrl + id, smartphone, httpOptions)
      .pipe(
        catchError(this.handleError('updateSmartphone', smartphone))
      );
  }
  deleteSmartphone(id: any, smartphone: Smartphone):Observable<Smartphone>{
    return this.http.delete<Smartphone>(localUrl+id,httpOptions)
    .pipe(
      catchError(this.handleError('deleteSmartphone',smartphone))
    );
  }


  private handleError<T>(operation ='operation', result?: T){
    return (error: any): Observable<T> =>{
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
  private log(message: string){
    console.log(message);
  }
}
