import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor() { }

  saveFormData(form: FormGroup) {
    console.log(form.value);
    const formData = JSON.stringify(form.value);
    localStorage.setItem('formData', formData);
  }

  getData() {
    const formDataGet = localStorage.getItem('formData');
    if (formDataGet !== null) {
      const formData = JSON.parse(formDataGet);
      return formData
    }
  }
}
