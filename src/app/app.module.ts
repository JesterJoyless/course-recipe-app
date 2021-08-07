
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeadersComponent } from './headers/headers.component';
import { AppRoutingModule } from './app-routing.module';;
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store'
import * as fromApp from './store/app.reducer'
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth.effects';



@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
