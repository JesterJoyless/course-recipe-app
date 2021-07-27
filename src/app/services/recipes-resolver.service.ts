import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/recipes.model';
import { DataStorageService } from './data-storage.service';
import { RecipesService } from './recipes.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorage: DataStorageService, private recipeService: RecipesService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
    const recipes = this.recipeService.getRecipes();
    if (recipes.length == 0) {
      return this.dataStorage.fetchRecipes();
    } else {
      return recipes;
    }

  }

}
