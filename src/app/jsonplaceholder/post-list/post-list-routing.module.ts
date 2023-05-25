import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from './post-list.component';
import { UpdateComponent } from '../update/update.component';
import { CreateComponent } from '../create/create.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'update/:id',
    component: UpdateComponent
  },
  {
    path: 'postlist',
    component: PostListComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PostListRoutingModule { }
