import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AlertComponent,
    ShortenPipe,
    DropdownDirective,
    LoadingSpinnerComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AlertComponent,
    ShortenPipe,
    DropdownDirective,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    CommonModule
  ]
})
export class SharedModule { }
