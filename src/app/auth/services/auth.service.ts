import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

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

  login() {
    return this.http.get<Auth>(`http://localhost:3000/usuarios/1`)
      .pipe(
        tap(auth => this._auth = auth)
        )
  }


  logout() {
    this._auth = undefined;
  }

}
