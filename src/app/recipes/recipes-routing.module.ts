import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../guard/auth.guard';
import { RecipesResolverService } from '../services/recipes-resolver.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [
  {
    path: '', component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent, pathMatch: 'full' },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipesDetailComponent, resolve: [RecipesResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
