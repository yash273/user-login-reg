import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  productForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      products: this.formBuilder.array([])
    });
    this.addProduct();

  }
  get productControls() {
    return (this.productForm.get('products') as FormArray).controls;
  }

  addProduct() {
    const productGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      availableForMen: [false],
      availableForWomen: [false]
    });

    (this.productForm.get('products') as FormArray).push(productGroup);
  }

  removeProduct(index: number) {
    (this.productForm.get('products') as FormArray).removeAt(index);
  }

  onSubmit() {
    console.log(this.productForm.value);
  }

}
