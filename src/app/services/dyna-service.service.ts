import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
// Importamos los modulos HTTP
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DynaServiceService {

  // Declaramos nuestra URL de END POINT
  private urlEndPoint = 'https://api.dynasystem.cl/data/sensor';

  constructor(private http: HttpClient) { }

  getData(sensor: number, desde: string, hasta: string): Observable<any> {
    return this.http.get<any>(`${this.urlEndPoint}/${sensor}/calculatedIndex/1?from=${desde}Z&to=${hasta}Z`).pipe(
      catchError(e => {
        if (e.status !== 401 && e.error.message) {
          console.log(e.error.message);
        }
        console.log(e.error.message);
        return throwError(e);
      })
    );
  }
}
