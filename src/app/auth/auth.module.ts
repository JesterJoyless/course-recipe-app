import { AuthRoutingModule } from './auth-routing.module';
import { RouterModule } from '@angular/router';
import { NgModule, Directive } from '@angular/core';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [RouterModule, AuthRoutingModule, SharedModule, FormsModule]
})
export class AuthModule { }
