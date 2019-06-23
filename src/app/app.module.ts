import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { SpinerComponent } from './shared/spiner/spiner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingEditComponent,
    DropdownDirective,
    AuthenticationComponent,
    SpinerComponent,
    AlertComponent,
    ShoppingListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecipesModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    DataStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
