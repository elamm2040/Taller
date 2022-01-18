import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TallerRoutingModule} from "./taller.routing";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {SharedModule} from "./General/modules/shared.module";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    TallerRoutingModule,
    SharedModule
  ]
})
export class TallerModule {
}
