import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from '../interfaces/product';
import { AlertService } from '../alerts/alert.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList: [];
  oldProducts: string | null;


  constructor(
    private productService: ProductsService,
    private alertsService: AlertService
  ) {
    this.productList = [];
    this.oldProducts = localStorage.getItem('productData');

  }

  displayedColumns: string[] = ['Id', 'sku', 'name', 'description', 'category', 'price', 'isStock', 'availableFor', 'Action'];


  ngOnInit(): void {
    const oldProducts = localStorage.getItem('productData');
    if (oldProducts !== null) {
      this.productList = JSON.parse(oldProducts)
    }
  }

  delete(pId: number) {
    const thispIdIndex = this.productList.findIndex((a: Product) => a.pId == pId)
    this.productService.openDelete(this.productList[thispIdIndex])
      .afterClosed().subscribe((res: boolean) => {
        if (res) {
          const oldProducts = localStorage.getItem('productData');
          if (oldProducts !== null) {
            const productList = JSON.parse(oldProducts)
            productList.splice(productList.findIndex((a: Product) => a.pId == pId), 1);
            localStorage.setItem('productData', JSON.stringify(productList));
          }
          const records = localStorage.getItem('productData');
          if (records !== null) {
            this.productList = JSON.parse(records);
          }
          this.alertsService.showAlert('Product Deleted Successfully!', 'success')
        }
      })
  }

  truncate(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
    }
    return text;
  }

}
