import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, take, tap, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'}) //The argument is optional. It is used instead of providing the service in the app.module.ts
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
    .put(
      'https://ng-course-recipe-book-427ed-default-rtdb.firebaseio.com/recipes.json',
      recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
      'https://ng-course-recipe-book-427ed-default-rtdb.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    );
    // return this.http.get<Recipe[]>('https://ng-course-recipe-book-427ed-default-rtdb.firebaseio.com/recipes.json')
    //   .pipe(map(recipes => {
    //     return recipes.map(recipe => {
    //       return {
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : []
    //       };
    //     });
    //   }),
    //   tap(recipes => {
    //     this.recipeService.setRecipes(recipes)
    //   })
    // )
    // .subscribe(recipes => {
    //   console.log(recipes);
    //   this.recipeService.setRecipes(recipes)
    // });
  }
}
