import { Ingredient } from '../models/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Potato', 12)
    ];

    ingredientEmmiter = new EventEmitter<Ingredient[]>();

    addIngredient(ingridient: Ingredient) {
        this.ingredients.push(ingridient);
        this.ingredientEmmiter.emit(this.ingredients);
    }

    getIngredients(): Ingredient[] {
        return this.ingredients;
    }
}
