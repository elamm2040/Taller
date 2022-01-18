import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesRoutingModule} from "./categories.routing";
import {CategoriesComponent} from "./categories.component";
import {ListCategoriesComponent} from './list-categories/list-categories.component';
import {SharedModule} from "../../General/modules/shared.module";
import {BreadcrumbCategoriesComponent} from './breadcrumb-categories/breadcrumb-categories.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    ListCategoriesComponent,
    BreadcrumbCategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule {
}
