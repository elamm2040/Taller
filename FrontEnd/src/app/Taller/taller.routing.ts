import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DashboardComponent} from "./components/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'categories',
    loadChildren: () => import('./components/categories/categories.module').then(module => module.CategoriesModule)
  },
  {
    path: 'tools',
    loadChildren: () => import('./components/tools/tools.module').then(module => module.ToolsModule)
  },
  {
    path: 'measureunit',
    loadChildren: () => import('./components/measurement-unit/mu.module').then(module => module.MUModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TallerRoutingModule {
}
