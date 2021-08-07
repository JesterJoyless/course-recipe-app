import { take, exhaustMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducer'
import * as fromAuthActions from '../store/auth.action'
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1), map(authState => {
        return authState.user;
      }), exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token)
        });
        return next.handle(modifiedReq);
      }));

  }

}
