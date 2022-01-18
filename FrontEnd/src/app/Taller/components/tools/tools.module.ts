import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolsRoutingModule} from "./tools.routing";
import {SharedModule} from "../../General/modules/shared.module";
import {ToolsComponent} from "./tools.component";

@NgModule({
  declarations: [
    ToolsComponent
  ],
  imports: [
    CommonModule,
    ToolsRoutingModule,
    SharedModule
  ]
})
export class ToolsModule {
}
