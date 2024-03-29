import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { MaterialModule } from '../app/material/material.module';
import { NameByIdPipe } from './pipes/name-by-id.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { HeaderComponent } from './components/header/header.component';
import { ThemeService } from './services/theme.service'

@NgModule({
  declarations: [
    NameByIdPipe,
    TruncatePipe,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  providers: [
    DataService,
    ThemeService
  ],
  exports: [
    NameByIdPipe,
    TruncatePipe,
    HeaderComponent
  ]
})
export class SharedModule { }