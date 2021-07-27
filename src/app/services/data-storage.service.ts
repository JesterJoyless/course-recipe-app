import { AuthService } from 'src/app/services/auth.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators'
import { Recipe } from '../recipes/recipes.model';
import { RecipesService } from './recipes.service';

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
    private recipeService: RecipesService,
    private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://course-recipe-app-d3d3d-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json',
      recipes).subscribe(responce => {
        console.log(responce);
      });
  }

  fetchRecipes() {
    return this.authService.user.pipe(take(1),
      exhaustMap(user => {
        return this.http.get<Recipe[]>('https://course-recipe-app-d3d3d-default-rtdb.asia-southeast1.firebasedatabase.app/recipes.json').pipe(map(recipes => {
          return recipes.map(recipe => {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          })
        }),
          tap(recipes => {
            this.recipeService.setRecipes(recipes);
          }))
      }));
  }
}
