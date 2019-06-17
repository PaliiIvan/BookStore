import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService) { }

  saveRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http.put('https://udemy-ungular-lessons.firebaseio.com/recipes.json', recipes);
  }

  getAllRecipes() {
    return this.http.get<Recipe[]>('https://udemy-ungular-lessons.firebaseio.com/recipes.json')
      .pipe(map<Recipe[], any>(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }), tap(recipes => {
        this.recipesService.addRecipes(recipes);
      })) ;
  }
}
