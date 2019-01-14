import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/reciple.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;
  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
    this.recipeService.recipeSelected
    .subscribe((recipe: Recipe) => {
        this.selectedRecipe = recipe;
      });
  }

}
