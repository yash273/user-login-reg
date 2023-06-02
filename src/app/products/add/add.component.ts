import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import { proDescriptionRegx, proNameRegx, proPriceRegx, proSkuRegx } from 'src/app/regex-rules/regex';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  productForm!: FormGroup;
  availableFor!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      products: this.formBuilder.array([
        this.createProduct()
      ])
    });
  }

  get productControls() {
    return this.productForm.get('products') as FormArray;
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

  onSubmit() {
    this.productService.saveProduct(this.productForm.value);
  }
}
