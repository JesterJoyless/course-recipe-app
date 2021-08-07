import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthInterceptor } from './interceptors/auth-interceptor.service';
import { DataStorageService } from './services/data-storage.service';
import { LoggingService } from './services/logging.service';
import { RecipesService } from './services/recipes.service';

@NgModule({
  providers: [

    RecipesService,
    DataStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }

  ]
})
export class CoreModule { }
