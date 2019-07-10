import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';


@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://udemy-ungular-lessons.firebaseio.com/recipes.json'
      );
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) { }

  @Effect({ dispatch: false })
  storeRecies = this.actions$
    .pipe(
      ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select(states => states.recipes)),
        switchMap(([actionData, recipeState]) => {
          console.log('T.T');
          return this.http
            .put(
              'https://udemy-ungular-lessons.firebaseio.com/recipes.json',
              recipeState.recipes
            );
        }
        )
    );
}
