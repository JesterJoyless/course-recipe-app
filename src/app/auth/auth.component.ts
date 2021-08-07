
import { Component, ComponentFactoryResolver, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData } from '../shared/authResponce.model';
import { AlertComponent } from '../shared/alert/alert.component';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as AuthActions from '../store/auth.action'


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
  isLoginMode = true;
  isLoading = false;
  error: string = '';

  private closeSub: Subscription;

  constructor(private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>) { }


  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    })
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onHandleError() {
    this.error = null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;

    if (this.isLoginMode) {

      // authObs = this.authService.loginIn(email, password);
      this.store.dispatch(new AuthActions.LoginStart({ email: email, password: password }))
    } else {

      authObs = this.authService.signUp(email, password);
    }


    // authObs.subscribe(
    //   resData => {
    //     console.log(resData);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   }, errorMessage => {
    //     this.error = errorMessage;
    //     this.showErrorAlert(this.error);
    //     this.isLoading = false;
    //   }
    // );
    form.reset();
  }

  private showErrorAlert(error: string) {
    const alertComFac = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainer = this.alertHost.viewContainerRef;
    hostViewContainer.clear();
    const componentRef = hostViewContainer.createComponent(alertComFac);

    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainer.clear();
    });

  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

}
