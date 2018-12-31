import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @Output() createNewIngridient  = new EventEmitter<Ingredient>();

  constructor() { }


  ngOnInit() {
  }

  onAddIngridient() {
    this.createNewIngridient.emit(new Ingredient(this.nameInput.nativeElement.control.value, this.amountInput.nativeElement.control.value));
  }
}
