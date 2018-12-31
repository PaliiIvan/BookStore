import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/reciple.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
@Input() recipleItem: Recipe;
@Output() itemSelected = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }
  onSelectItem() {
    this.itemSelected.emit();
  }
}
