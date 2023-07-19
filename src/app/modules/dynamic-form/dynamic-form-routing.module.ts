import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ViewFormComponent } from './components/view-form/view-form.component';

const routes: Routes = [
  {
    path: '',
    component: CreateFormComponent
  },
  {
    path: 'view-form',
    component: ViewFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicFormRoutingModule { }
