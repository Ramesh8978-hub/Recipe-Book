import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes.component';
import { AuthGuard } from '../Auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailComponent } from './recipes-detail/recipes-detail.component';
import { recipeResolverService } from './recipes-resolver.service';

const routes:Routes=[
    {
        path: '', component: RecipesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: RecipeStartComponent },
          { path: 'new', component: RecipeEditComponent },
          { path: ':id', component: RecipesDetailComponent, resolve: [recipeResolverService] },
          { path: ':id/edit', component: RecipeEditComponent, resolve: [recipeResolverService] },
        ]
      }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class RecipesRoutingModule{}