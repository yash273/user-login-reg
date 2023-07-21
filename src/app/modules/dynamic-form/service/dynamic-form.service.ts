import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(
    private router: Router,
  ) { }

  saveFormData(form: FormGroup) {
    console.log(form.value);
    const formData = JSON.stringify(form.value);
    localStorage.setItem('formData', formData);
    // this.router.navigate(['/create-form/view-form']);
  }

  getData() {
    const formDataGet = localStorage.getItem('formData');
    if (formDataGet !== null) {
      const formData = JSON.parse(formDataGet);
      return formData
    }
  }
}
