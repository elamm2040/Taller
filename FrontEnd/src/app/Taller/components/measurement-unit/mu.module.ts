import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MURoutingModule} from "./mu.routing";
import {SharedModule} from "../../General/modules/shared.module";
import {MeasurementUnitComponent} from "./measurement-unit.component";
import {EditMUComponent} from './edit-mu/edit-mu.component';

@NgModule({
  declarations: [
    MeasurementUnitComponent,
    EditMUComponent
  ],
  imports: [
    CommonModule,
    MURoutingModule,
    SharedModule
  ]
})
export class MUModule {
}
