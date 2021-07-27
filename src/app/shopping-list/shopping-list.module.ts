import { ShoppinglistRoutingModule } from './shopping-list-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule,
    ShoppinglistRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]

})
export class ShoppinglistModule { }
