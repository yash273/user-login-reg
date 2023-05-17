import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListComponent } from '../../list/list.component';
import { HomeComponent } from '../../home.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public user: any,
    public dialogRef: MatDialogRef<HomeComponent>,) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close();
  }

}
