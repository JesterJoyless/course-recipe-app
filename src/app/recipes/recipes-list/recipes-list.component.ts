import { Recipe } from './../recipes.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  subscription!: Subscription;
  isLoading = false;

  constructor(private recipeService: RecipesService,
    private router: Router,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.subscription = this.recipeService.recipesList.subscribe(

      (recipe: Recipe[]) => {

        this.recipes = recipe;
      }
    );

    this.recipes = this.recipeService.getRecipes();

  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
