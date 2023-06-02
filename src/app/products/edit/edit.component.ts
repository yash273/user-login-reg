import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { proNameRegx, proDescriptionRegx, proPriceRegx, proSkuRegx } from 'src/app/regex-rules/regex';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  productForm!: FormGroup;
  availableFor!: FormGroup;
  pId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService,
    private route: ActivatedRoute,

  ) {
    this.route.params.subscribe((res) => {
      this.pId = parseInt(res['pId'], 10);
    });
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    });
    this.populateProduct(this.productService.getProductData(this.pId))
  }

  get productControls() {
    return this.productForm.get('products') as FormArray;
  }

  populateProduct(pData: Product) {
    pData.products.forEach(
      (item: any) => {
        this.productControls.push(
          this.formBuilder.group({
            name: [item.name, [Validators.required, Validators.pattern(proNameRegx)]],
            description: [item.description, [Validators.required, Validators.pattern(proDescriptionRegx)]],
            category: [item.category, [Validators.required]],
            price: [item.price, [Validators.required, Validators.pattern(proPriceRegx)]],
            sku: [item.sku, [Validators.required, Validators.pattern(proSkuRegx)]],
            isStock: [item.isStock, [Validators.required]],
            availableFor: this.formBuilder.group({
              men: [item.availableFor.men],
              women: [item.availableFor.women]
            })
          })
        )
      }
    )
  }

  createProduct() {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(proNameRegx)]],
      description: ['', [Validators.required, Validators.pattern(proDescriptionRegx)]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern(proPriceRegx)]],
      sku: ['', [Validators.required, Validators.pattern(proSkuRegx)]],
      isStock: ['', [Validators.required]],
      availableFor: this.formBuilder.group({
        men: [false],
        women: [false]
      })
    });
  }

  addProduct() {
    this.productControls.push(this.createProduct())
  }

  removeProduct(index: number) {
    this.productControls.removeAt(index)
  }

  onEditSubmit() {
    this.productService.saveEditedProduct(this.productForm.value, this.pId);
  }

}
