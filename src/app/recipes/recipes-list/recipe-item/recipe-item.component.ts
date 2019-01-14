import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/reciple.model';
import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() recipleItem: Recipe;

  constructor(private recipeService: RecipesService) { }

  ngOnInit() {
  }
  onSelectItem() {
    this.recipeService.recipeSelected.emit(this.recipleItem);
  }
}
