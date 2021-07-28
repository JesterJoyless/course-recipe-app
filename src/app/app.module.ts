
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeadersComponent } from './headers/headers.component';
import { AppRoutingModule } from './app-routing.module';;
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { StoreModule } from '@ngrx/store'
import { shoppinglistReducer } from './store/shopping-list.reducer';




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
    StoreModule.forRoot({ shoppingList: shoppinglistReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
