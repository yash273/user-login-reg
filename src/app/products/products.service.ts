import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { AlertService } from '../alerts/alert.service';
import { Router } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private router: Router,
    private alertsService: AlertService,
    private dialog: MatDialog
  ) { }

  newProductId(): number {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    const uniqueProductId = timestamp * 1000 + randomNum;
    return uniqueProductId;
  }

  saveProduct(data: Product) {
    const oldProducts = localStorage.getItem('productData');
    const latestProductId = this.newProductId();
    data.pId = latestProductId;

    if (oldProducts !== null) {
      const productList = JSON.parse(oldProducts);
      productList.push(data);
      localStorage.setItem('productData', JSON.stringify(productList));
      this.alertsService.showAlert('Product Added Successfully!', 'success')
    } else {
      const productArr = [data];
      localStorage.setItem('productData', JSON.stringify(productArr));
      this.alertsService.showAlert('Product Added Successfully!', 'success')
    }
    this.router.navigate(['/products']);
  }

  saveEditedProduct(data: Product, pId: number) {
    const oldProducts = localStorage.getItem('productData');
    if (oldProducts != null) {
      const productList = JSON.parse(oldProducts);
      productList.splice(productList.findIndex((a: Product) => a.pId == pId), 1);
      data.pId = pId;
      productList.push(data)
      localStorage.setItem('productData', JSON.stringify(productList))
      this.alertsService.showAlert('Product Saved Successfully!', 'success')
      this.router.navigate(['/products']);
    }
  }

  getProductData(id: number) {
    const oldProducts = localStorage.getItem('productData');
    if (oldProducts !== null) {
      const userList = JSON.parse(oldProducts);
      const pidIndex = userList.findIndex((a: any) => a.pId == id);
      return userList[pidIndex]
    }
  }

  openDelete(data: Product) {
    return this.dialog.open(DeleteComponent, {
      width: '400px',
      disableClose: true,
      data: {
        pId: data.pId,
      }
    });
  }

}