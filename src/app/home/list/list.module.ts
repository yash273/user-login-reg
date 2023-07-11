import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(
      [
        { path: '', component: ListComponent },
      ]
    )

  ]
})
export class ListModule { }
