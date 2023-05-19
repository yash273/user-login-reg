import { Component, Inject, OnInit } from '@angular/core';
import { ListComponent } from '../../list/list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public user: any,
    public dialogRef: MatDialogRef<ListComponent>,) { }

  ngOnInit(): void {
  }
  onClose() {
    this.dialogRef.close();
  }

}
