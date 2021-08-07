
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AuthResponseData } from '../shared/authResponce.model';
import * as AuthActions from './auth.action';

@Injectable()
export class AuthEffects {

  @Effect()
  authLogin =
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
          + environment.firebaseAPIKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true
          }).pipe(map(resData => {
            const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
            return new AuthActions.Login({ email: resData.email, userID: resData.localId, token: resData.idToken, expirationDate: expirationDate });
          }), catchError(errorRes => {
            let errorMessage = '';

            switch (errorRes.error.error.message) {
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'The User does not exist';
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'Invalid Password';
                break;
              case 'USER_DISABLED':
                errorMessage = 'Account disabled by Admin';
                break;
              case 'EMAIL_EXISTS':
                errorMessage = 'The Email already exists';
                break;
              case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                errorMessage = 'To many attempts have been made Try again later';
                break;
              default:
                errorMessage = 'Something went wrong Unknown Error'
                break;
            }
            return of(new AuthActions.LoginFail(errorMessage));
          }))
      })
    );



  @Effect({ dispatch: false })
  authSuccess$ = this.actions$.pipe(ofType(AuthActions.LOGIN), tap(() => {
    this.router.navigate(['/']);
  }))


  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) { }
}
