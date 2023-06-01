import { Component, Inject, OnInit } from '@angular/core';
import { ProductsComponent } from '../products.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    public dialogRef: MatDialogRef<ProductsComponent>
  ) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

}
