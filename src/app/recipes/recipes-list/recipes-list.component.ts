import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Recipe } from 'src/app/models/reciple.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  @Output() chosedRecipleEvent = new EventEmitter<Recipe>();
  recipleas: Recipe[] = [
    new Recipe('Meat', 'Some Meat Description',
    'https://res.cloudinary' +
    '.com/hellofresh/image/upload/' +
    'f_auto,fl_lossy,h_436,q_auto/v1/hellofresh_s3/' +
    'image/enchiladas-aux-legumes-1a1102aa.jpg'),
    new Recipe(
      'Salad',
      'Salad Description',
      'https://assets.bonappetit.com/' +
      'photos/596a896d7102712b68401ab0/16:9/' +
      'w_1200,c_limit/tomato-salad-with-' +
      'feta-and-pistachios.jpg'
    )
  ];
  constructor() { }

  ngOnInit() {
  }

  onCheckedRecipleItem(recipe: Recipe) {
    this.chosedRecipleEvent.emit(recipe);
  }
}
