import { Injectable } from '@angular/core';
import { Ingredients } from '../shared/ingredients.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientsChanged = new Subject<Ingredients[]>();
  ingredientsEdited = new Subject<number>();

  private ingredients: Ingredients[] = [
    new Ingredients('Apples', 5),
    new Ingredients('Tomatos', 6)
  ];
  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredients) {
    this.ingredients.push(ingredient);
    this.updateChange();
  }
  addIngredients(ingredients: Ingredients[]) {
    this.ingredients.push(...ingredients);
    this.updateChange();
  }

  deleteingredient(index: number) {
    this.ingredients.splice(index, 1);
    this.updateChange();
  }

  updateIngredient(index: number, newIngredient: Ingredients) {
    this.ingredients[index] = newIngredient;
    this.updateChange();
  }

  updateChange() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
