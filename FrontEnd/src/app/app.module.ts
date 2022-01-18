import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app.routing";
import {LoginComponent} from "./Taller/General/views/login/login.component";
import {RegisterComponent} from "./Taller/General/views/register/register.component";
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppAsideModule, AppBreadcrumbModule, AppFooterModule, AppHeaderModule, AppSidebarModule} from "@coreui/angular";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TabsModule} from "ngx-bootstrap/tabs";
import {ChartsModule} from "ng2-charts";
import {IconModule, IconSetModule, IconSetService} from "@coreui/icons-angular";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {DefaultLayoutComponent} from "./Taller/General/layouts";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthGuardService} from "./Taller/General/guards/auth-guard.service";
import {OutGuardService} from "./Taller/General/guards/out-guard.service";
import {P404Component} from "./Taller/General/views/error/404.component";
import {RequestInterceptor} from "./Taller/General/interceptors/request.interceptor";
import {SharedModule} from "./Taller/General/modules/shared.module";

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DefaultLayoutComponent,
    P404Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    IconModule,
    IconSetModule.forRoot(),
    SharedModule
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    },
    IconSetService,
    AuthGuardService,
    OutGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
