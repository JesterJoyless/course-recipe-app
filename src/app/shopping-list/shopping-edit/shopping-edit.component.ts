import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredients } from 'src/app/shared/ingredients.model';
import { Store } from '@ngrx/store';
import * as ShoppingListAction from '../../store/shopping-list.actions';
import * as fromShoppingList from '../../store/shopping-list.reducer';



@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;

  shoppingListForm = new FormControl;
  editedItem!: Ingredients;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromShoppingList.AppState>
  ) { }


  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;


        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
      else {
        this.editMode = false;
      }
    });
    // this.subscription = this.shoppingListService.ingredientsEdited
    //   .subscribe(
    //     (index: number) => {
    //       this.editedItemIndex = index;
    //       this.editMode = true;
    //       this.editedItem = this.shoppingListService.getIngredient(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       })
    //     }
    //   );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIng = new Ingredients(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex, newIng);
      this.store.dispatch(new ShoppingListAction.UpdateIngredients(newIng))
    } else {
      //this.shoppingListService.addIngredient(newIng)
      this.store.dispatch(new ShoppingListAction.AddIngredient(newIng));
    }
    form.reset(this.editMode = false);
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  onDelete() {
    //  this.shoppingListService.deleteingredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListAction.DeleteIngredients());
    this.onClear();
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

}
