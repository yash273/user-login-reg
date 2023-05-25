import { Component, Inject, OnInit } from '@angular/core';
import { PostListComponent } from '../post-list/post-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PostListComponent>
  ) { }

  ngOnInit(): void {
  }
  onClosee() {
    this.dialogRef.close();
  }


}
