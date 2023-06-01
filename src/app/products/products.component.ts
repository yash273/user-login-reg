import { Component, OnInit } from '@angular/core';
import { ProductsService } from './products.service';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productList: any;

  constructor(
    private productService: ProductsService,
  ) {
    this.productList = [];
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
    console.log(thispIdIndex)
    this.productService.openDelete(this.productList[thispIdIndex])
  }

}
