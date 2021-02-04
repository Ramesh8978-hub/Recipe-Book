import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';


export interface appState {
    shoppingList: fromShoppingList.State,
}

export const appReducer: ActionReducerMap<appState> = {
    shoppingList: fromShoppingList.shoppingListReducer,
}