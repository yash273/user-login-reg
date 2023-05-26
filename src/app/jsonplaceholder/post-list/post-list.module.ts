import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { PostListComponent } from './post-list.component';
import { PostListRoutingModule } from './post-list-routing.module';
import { CreateComponent } from '../create/create.component';
import { FormsModule } from '@angular/forms';
import { UpdateComponent } from '../update/update.component';
import { ViewComponent } from '../view/view.component';
import { DeleteComponent } from '../delete/delete.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostListComponent,
    UpdateComponent,
    CreateComponent,
    ViewComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    PostListRoutingModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PostListModule { }
