import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MeasurementUnitComponent} from "./measurement-unit.component";

const routes: Routes = [
  {
    path: '',
    component: MeasurementUnitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MURoutingModule {
}
