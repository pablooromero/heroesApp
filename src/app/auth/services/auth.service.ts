import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _auth: Auth | undefined;

  get auth(): Auth {
    return {...this._auth!}
  }

  constructor(private http: HttpClient) {}

  //También se puede usar | boolean para no usar el of de rxjs
  verificaAutenticacion(): Observable<boolean> {
    if ( !localStorage.getItem('token') ) {
      return of (false);
    } 
    return this.http.get<Auth>( `http://localhost:3000/usuarios/1` )
            .pipe(
              map(auth => {
                this._auth = auth;
                return true;
              })
            )
  }

  login() {
    return this.http.get<Auth>(`http://localhost:3000/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth),
        tap(auth => localStorage.setItem('token', auth.id))
        );
  }

  logout() {
    this._auth = undefined;
  }

}
