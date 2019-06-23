import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthenticationComponent } from './auth/authentication/authentication.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthenticationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
