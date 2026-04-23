import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, map, throwError, pipe} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ApiResponse} from '../Models/api-response';
import {PersonDTO} from '../Models/person-dto';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  CreatePerson(person: PersonDTO): Observable<PersonDTO>
  {
    return this.http.post<ApiResponse<PersonDTO>>(`${this.apiUrl}/client/addPerson`, person).pipe(
      map((res)=> {
        if (!res.success)
        {
          throw Error(res.message);
        }
        return res.data;
      }),
      catchError(this.handlerError)
    );
  }

  GetPerson(): Observable<PersonDTO[]>
  {
    return this.http.get<ApiResponse<PersonDTO[]>>(`${this.apiUrl}/client/getPersons`).pipe(
      map((res) => {
        if (!res.success)
        {
          throw Error(res.message);
        }
        return res.data;
      }),
      catchError(this.handlerError)
    );
  }

  private handlerError(error: HttpErrorResponse)
  {
    let errorMsg = "Error desconocido";

    if (error.error instanceof ErrorEvent)
    {
      errorMsg = `Error de cliente ${error.error.message}`;
    }
    else if (!error.error)
    {
      errorMsg = error.message;
    }
    else
    {
      if (typeof error.error === 'string')
      {
        try
        {
          const parsed = JSON.parse(error.error);
          errorMsg = parsed.message;
        }
        catch
        {
          errorMsg = error.error;
        }
      }
    }

    return throwError(() => new Error(errorMsg));
  }

}
