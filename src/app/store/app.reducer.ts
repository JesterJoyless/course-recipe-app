import * as fromShoppingList from '../store/shopping-list.reducer'
import * as fromAuth from '../store/auth.reducer'
import { ActionReducerMap } from '@ngrx/store'

export interface AppState {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppinglistReducer,
  auth: fromAuth.authReducer
}
