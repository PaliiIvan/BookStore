import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable()
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService) {}

  saveRecipes() {
    const recipes = this.recipesService.getRecipes();
    return this.http.put('https://udemy-ungular-lessons.firebaseio.com/recipes.json', recipes);
  }

  getAllRecipes() {
      this.http.get<Recipe[]>('https://udemy-ungular-lessons.firebaseio.com/recipes.json')
      .subscribe(x => {
      this.recipesService.addRecipes(x);
    });
  }
}
