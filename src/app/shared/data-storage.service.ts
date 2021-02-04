import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators'
import { RecipeService } from '../recipes/recipes.service.';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../Auth/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http
            .put('https://ng-course-recipe-book-5a579.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            })
    }
    fetchRecipes() {
        return this.http
            .get<Recipe[]>('https://ng-course-recipe-book-5a579.firebaseio.com/recipes.json',
            ).pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    })
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            );
    }

}




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { map, tap } from 'rxjs/operators'
// import { Store } from '@ngrx/store';

// import { RecipeService } from '../recipes/recipes.service.';
// import { Recipe } from '../recipes/recipes.model';
// import * as fromApp from '../store/app.reducer';
// import * as RecipesActions from '../recipes/store/recipes.action'


// @Injectable({ providedIn: 'root' })
// export class DataStorageService {
//     constructor(private http: HttpClient,
//         private recipeService: RecipeService,
//         private store: Store<fromApp.appState>
//     ) { }

//     storeRecipes() {
//         const recipes = this.recipeService.getRecipes();
//         return this.http
//             .put('https://ng-course-recipe-book-5a579.firebaseio.com/recipes.json', recipes)
//             .subscribe(response => {
//                 console.log(response);
//             })
//     }
//     fetchRecipes() {
//         return this.http
//             .get<Recipe[]>('https://ng-course-recipe-book-5a579.firebaseio.com/recipes.json',
//             ).pipe(
//                 map(recipes => {
//                     return recipes.map(recipe => {
//                         return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
//                     })
//                 }),
//                 tap(recipes => {
//                     // this.recipeService.setRecipes(recipes);
//                     this.store.dispatch(new RecipesActions.SetRecipes(recipes));
//                 })
//             );
//     }

// }





