import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredients } from 'src/app/shared/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  shoppingListForm = new FormControl;
  editedItem!: Ingredients;

  constructor(private shoppingListService: ShoppingListService) { }


  ngOnInit(): void {
    this.subscription = this.shoppingListService.ingredientsEdited
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIng = new Ingredients(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIng);
    } else {
      this.shoppingListService.addIngredient(newIng)
    }
    form.reset(this.editMode = false);
  }

  onClear() {
    this.slForm.reset(this.editMode = false)
  }

  onDelete() {
    this.shoppingListService.deleteingredient(this.editedItemIndex);
    this.onClear();
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
