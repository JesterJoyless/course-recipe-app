import { Ingredients } from './../shared/ingredients.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredients[] = [];
  private igChangedSub!: Subscription;

  constructor(private shoppingListService: ShoppingListService, private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.loggingService.printLog('From Shopping component');
    this.igChangedSub = this.shoppingListService.ingredientsChanged
      .subscribe((ingredient: Ingredients[]) => {
        this.ingredients = ingredient;
      });
  }

  ngOnDestroy(): void {
    this.igChangedSub.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.ingredientsEdited.next(index)
  }




}
