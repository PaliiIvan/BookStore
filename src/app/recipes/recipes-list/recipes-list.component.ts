import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/reciple.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipleas: Recipe[] = [
    new Recipe('Forgotten  Realams', 'Fantasy',
     'https://vignette.wikia.nocookie.net' +
     '/rpg/images/e/e1/Forgotten_Realms_Campaign' +
     '_Set.jpg/revision/latest?cb=20181029100324&path-prefix=ru')
  ];
  constructor() { }

  ngOnInit() {
  }

}
