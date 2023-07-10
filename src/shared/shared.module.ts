import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { MaterialModule } from '../app/material/material.module';
import { NameByIdPipe } from './pipes/name-by-id.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [
    NameByIdPipe,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    DataService
  ],
  exports: [
    NameByIdPipe,
    TruncatePipe,
  ]
})
export class SharedModule { }