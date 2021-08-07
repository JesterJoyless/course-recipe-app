import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { Recipe } from '../recipes/recipes.model';
import { Ingredients } from '../shared/ingredients.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  recipesList = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe('Noddles Paste Lasagna',
  //     'A lasagna made with nooles - I Know',
  //     'http://www.pngall.com/wp-content/uploads/5/Cheese-Lasagna-PNG-Pic.png',
  //     [
  //       new Ingredients('Meat', 2),
  //       new Ingredients('Noodles', 1),
  //       new Ingredients('Tomatos', 3)
  //     ]),
  //   new Recipe('Thai Spicy Noodles',
  //     'Spicy Thai Noodles - BurnBabyBurn',
  //     'https://cdn.pixabay.com/photo/2017/08/29/11/50/noodles-2693009_960_720.png',
  //     [
  //       new Ingredients('Beaf', 2),
  //       new Ingredients('Thai Noodles', 1),
  //       new Ingredients('Tomatos', 3),
  //       new Ingredients('Basil', 2)
  //     ])
  // ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.updateChange();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.updateChange();
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.updateChange();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.updateChange();
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))

  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  updateChange() {
    this.recipesList.next(this.recipes.slice());
  }

  constructor(
    private store: Store<fromApp.AppState>
  ) { }
}
