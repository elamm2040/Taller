import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./Taller/General/views/login/login.component";
import {RegisterComponent} from "./Taller/General/views/register/register.component";
import {DefaultLayoutComponent} from "./Taller/General/layouts";
import {AuthGuardService} from "./Taller/General/guards/auth-guard.service";
import {OutGuardService} from "./Taller/General/guards/out-guard.service";
import {P404Component} from "./Taller/General/views/error/404.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [OutGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [OutGuardService]
  },
  {
    path: 'workshop',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./Taller/taller.module').then(module => module.TallerModule)
      }
    ],
    canActivateChild: [AuthGuardService]
  },
  {path: '**', component: P404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
