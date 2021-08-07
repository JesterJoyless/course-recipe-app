import { Store } from '@ngrx/store';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { UserModel } from './../shared/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponseData } from '../shared/authResponce.model';
import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from '../store/auth.action';




@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // user = new BehaviorSubject<UserModel>(null);
  private tokenExpires: any;


  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuth(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
      }));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(new fromAuthActions.Login({ email: loadedUser.email, userID: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate) }));
      const expirationTimer = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationTimer);
    }
  }

  loginIn(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey
      ,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(resData => {
        this.handleAuth(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
      }))

  }
  logOut() {
    //this.user.next(null);
    this.store.dispatch(new fromAuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpires) {
      clearTimeout(this.tokenExpires);
    }
    this.tokenExpires = null;
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpires = setTimeout(() => {
      this.logOut();
    }, expirationDuration)
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {

    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new UserModel(
      email,
      userId,
      token,
      expirationDate);

    //this.user.next(user);
    this.store.dispatch(new fromAuthActions.Login({ email: email, userID: userId, token: token, expirationDate: expirationDate }));
    this.autoLogOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown Error Occured';
    console.log(errorRes.error.error.message);
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
    return throwError(errorMessage);
  }

}
