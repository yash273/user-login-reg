import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { MaterialModule } from '../material/material.module';
import { NameByIdPipe } from './pipes/name-by-id.pipe';


@NgModule({
  declarations: [
  
    NameByIdPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    DataService
  ],
})
export class SharedModule { }
