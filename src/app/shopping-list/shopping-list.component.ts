import { Ingredients } from './../shared/ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../services/logging.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer'
import * as ShoppingListActions from '../store/shopping-list.actions'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredients[] }>;
  private igChangedSub!: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {

    this.ingredients = this.store.select('shoppingList');


    // this.ingredients = this.shoppingListService.getIngredients();
    // this.loggingService.printLog('From Shopping component');
    // this.igChangedSub = this.shoppingListService.ingredientsChanged
    //   .subscribe((ingredient: Ingredients[]) => {
    //     this.ingredients = ingredient;
    //   });
  }



  onEditItem(index: number) {
    // this.shoppingListService.ingredientsEdited.next(index)
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy(): void {
    // this.igChangedSub.unsubscribe();
  }



}
