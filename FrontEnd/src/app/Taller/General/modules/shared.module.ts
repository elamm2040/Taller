import {NgModule} from '@angular/core';
import {NgbActiveModal, NgbDropdown, NgbModule, NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {LoadingComponent} from "../components/loading/loading.component";
import {SafeHtmlPipe} from "../pipes/safe-html.pipe";
import {NgbAccordion} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    LoadingComponent,
    SafeHtmlPipe
  ],
  exports: [
    LoadingComponent,
    SafeHtmlPipe,
    NgbModule,
    NgbAccordion,
    NgbDropdown,
    NgbPagination,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  imports: [
    NgbModule
  ]
})
export class SharedModule {
}
