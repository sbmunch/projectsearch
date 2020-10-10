import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductSearchComponent } from './product-search/product-search.component';

import { HttpClientModule } from '@angular/common/http';
import { PageSelectorComponent } from './page-selector/page-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductSearchComponent,
    PageSelectorComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }