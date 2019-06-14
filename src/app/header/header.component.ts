import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataService: DataStorageService) {}
  onSaveData() {
    this.dataService.saveRecipes().subscribe(x => console.log(x));
  }

  onFetchData() {
    this.dataService.getAllRecipes();
  }
}
